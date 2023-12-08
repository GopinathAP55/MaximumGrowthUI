import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignalService } from 'src/app/services/signal.service';
import { ApiServiceService } from '../../services/api-service.service'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  otpSent  = false;

  constructor(private apiService : ApiServiceService, private router : Router,private signalService : SignalService){}

  otpGenerated: boolean = false;

  generateOTP() {
    // Logic to generate OTP and make the OTP input visible
    this.otpGenerated = true;
  }

  login() {
    this.signalService.isLogin.set(true)
    this.router.navigateByUrl('/dashboard')
  }
}
