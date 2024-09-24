import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignalService } from 'src/app/services/signal.service';
import { ApiServiceService } from '../../services/api-service.service'
import { NotificationService } from 'src/app/services/notification-service';
import { MarketDataSocketService } from 'src/app/services/market-data/market-data-socket.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  otpSent = false;
  loginForm: FormGroup
  phoneNumber: number
  isLoading = false

  subscription: Subscription;
  data: any;


  @Input() clickedValue = 'Login';
  @Output() closeLogin = new EventEmitter<any>()
  constructor(private apiService: ApiServiceService, private router: Router, private signalService: SignalService, private formBuilder: FormBuilder,
    private notificationService: NotificationService, private webSocketService: MarketDataSocketService
  ) { }

  ngOnInit(): void {



    this.loginForm = this.formBuilder.group({

      password: ['', Validators.required],
     
      phoneNumber: [Validators.required, Validators.maxLength(10)]
    })
  }

  otpGenerated: boolean = false;

  generateOTP() {
    this.otpGenerated = true
    // Logic to generate OTP and make the OTP input visible
    this.isLoading = true
    this.apiService.generateOTP(this.loginForm.get('phoneNumber').value).subscribe({
      next: res => {
        console.log(res)
        console.log('otp sent')
        this.notificationService.showNotification('OTP Generated', 'success');
        this.isLoading = false
      },
      error: err => {
        console.log(err)
        this.notificationService.showNotification('OTP Generation Failed', 'error');

        this.isLoading = false
      }
    })
  }

  submit() {
    if (this.clickedValue == 'Login') {
      this.signalService.isLogin.set(true)
      this.isLoading = true
      this.apiService.login(this.loginForm.value).subscribe({
        next: res => {
          console.log(res)
          this.notificationService.showNotification('Login Successful.', 'success');
          localStorage.setItem('jwtToken', res.token);
          this.loadBroker()
          this.load()
          this.router.navigateByUrl('/dashboard')
        },
        error: error => {
          this.isLoading = false
          this.notificationService.showNotification(error.error.message || 'Login Failed', 'error');
          console.log(error)
        }
      })

    } else {
      this.signalService.isLogin.set(true)
      let data = this.loginForm.value
      this.isLoading = true
      this.apiService.verifyOtp(data).subscribe({
        next: res => {
          console.log(res)
          this.notificationService.showNotification(res.message, 'success');
          this.router.navigateByUrl('/login')
          this.isLoading = false
        },
        error: err => {
          console.log(err)
          this.notificationService.showNotification(err.error.message || 'Sign Up Error', 'error');
          this.isLoading = false
        }
      })
    }
  }

  close() {
    this.closeLogin.emit(false)
  }

  loadBroker() {
    this.apiService.getBroker('').subscribe({
      next: res => {
        console.log(res)
        this.findLoggedInBroker(res)
        this.signalService.brokerList.set(res)
        this.notificationService.showNotification(res.message || 'Loaded Successfully', 'success');
        this.isLoading = false
      },
      error: err => {
        this.isLoading = true
        this.notificationService.showNotification(err.message || 'Failed to load', 'error');
        this.isLoading = false
      }
    })
  }


  findLoggedInBroker(data) {
    console.log(data)
    if (data) {
      let index = 0
      data.forEach((broker) => {
        if (sessionStorage.getItem(broker.name)) {
          index++
        }
      })

      this.signalService.numberOfBrokerLoggedIn.set(index)
    }
  }


  load() {
    this.webSocketService.connect('ws://localhost:8080');
    this.subscription = this.webSocketService.getDataStream().subscribe(data => {
      this.data = data;


      if (data.ExchangeInstrumentID == 26000) {
        this.signalService.niftyData.set(this.data.Touchline.LastTradedPrice)

        this.signalService.niftyOpen.set(this.data.Touchline.Open)
      }
      if (data.ExchangeInstrumentID == 26001) {

        this.signalService.bankNiftyData.set(data.Touchline.LastTradedPrice)

        this.signalService.bankNiftyOpen.set(data.Touchline.Open)
      }
      if (data.ExchangeInstrumentID == 26003) {

        this.signalService.niftyItData.set(data.Touchline.LastTradedPrice)

        this.signalService.niftyItOpen.set(data.Touchline.Open)
      }
      if (data.ExchangeInstrumentID == 26005) {

        this.signalService.midcapNiftyData.set(data.Touchline.LastTradedPrice)

        this.signalService.midcapNiftyOpen.set(data.Touchline.Open)
      }
    })

  }


  ngOnDestroy(): void {
    //this.webSocketService.disconnect('ws://localhost:8080')
  }


}



