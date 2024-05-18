import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignalService } from 'src/app/services/signal.service';
import { ApiServiceService } from '../../services/api-service.service'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  otpSent  = false;
  loginForm:FormGroup

  @Input() clickedValue = 'Login';
  constructor(private apiService : ApiServiceService, private router : Router,private signalService : SignalService,private formBuilder:FormBuilder){}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username:'',
      password:'',
      otp:'',
      phoneNumber:''
    })
  }

  otpGenerated: boolean = false;

  generateOTP() {
    // Logic to generate OTP and make the OTP input visible
    this.otpGenerated = true;
  }

  submit() {
    if(this.clickedValue=='Login'){

      this.signalService.isLogin.set(true)
      this.router.navigateByUrl('/dashboard')
    }else{
      this.signalService.isLogin.set(true)
      let data = this.loginForm.value
      this.apiService.verifyOtp(data).subscribe({
        next:res=>{
          this.router.navigateByUrl('/login')
        },
        error:err=>{

        }
      })
    }
  }
}
