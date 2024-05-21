import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignalService } from 'src/app/services/signal.service';
import { ApiServiceService } from '../../services/api-service.service'
import { NotificationService } from 'src/app/services/notification-service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  otpSent  = false;
  loginForm:FormGroup
  phoneNumber:number
  isLoading = false

  @Input() clickedValue = 'Login';
  constructor(private apiService : ApiServiceService, private router : Router,private signalService : SignalService,private formBuilder:FormBuilder,
    private notificationService: NotificationService
  ){}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
    
      password:[''],
      otp:[''],
      phoneNumber:[]
    })
  }

  otpGenerated: boolean = false;

  generateOTP() {
    this.otpGenerated = true
    // Logic to generate OTP and make the OTP input visible
    this.apiService.generateOTP(this.loginForm.get('phoneNumber').value).subscribe({
      next:res=>{
        console.log(res)
        console.log('otp sent')
      },
      error:err=>{
        console.log(err)
      }
    })
  }

  submit() {
    if(this.clickedValue=='Login'){
      this.signalService.isLogin.set(true)
      this.isLoading = true
      this.apiService.login(this.loginForm.value).subscribe({
        next:res=>{
          console.log(res)
          this.notificationService.showNotification('Login Successful.','success');
          localStorage.setItem('jwtToken', res.token);
         
          this.router.navigateByUrl('/dashboard')
        },
        error:error=>{
          this.isLoading = false
          this.notificationService.showNotification(error.error.message,'error');
          console.log(error)
        }
      })

    }else{
      this.signalService.isLogin.set(true)
      let data = this.loginForm.value
      this.apiService.verifyOtp(data).subscribe({
        next:res=>{
          console.log(res)
          this.notificationService.showNotification(res.message,'success');
          this.router.navigateByUrl('/login')
        },
        error:err=>{
          console.log(err)
        }
      })
    }
  }
}
