import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '../../services/api-service.service'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  otpSent  = false;

  constructor(private apiService : ApiServiceService, private router : Router){}

  phoneNumberFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]{10}$'), // Adjust the pattern as per your phone number format
  ]);

  otpFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]{6}$'), // Adjust the pattern as per your phone number format
  ]);

  submit(): void {
    if (this.phoneNumberFormControl.valid && !this.otpSent) {

      this.apiService.generateOTP(`+91${this.phoneNumberFormControl.value}`).subscribe(
        (res:any)=>{
          console.log((res))
          this.otpSent = true
        },
        (error : any)=>{
          console.log(error)

        }
      )
      console.log('Phone number:', this.phoneNumberFormControl.value);
    } else {
      // Handle invalid form
      this.apiService.verifyOtp(`${this.otpFormControl.value}`).subscribe(
        (res:any)=>{
          console.log((res))
          this.router.navigateByUrl('dashboard')
        },
        (error : any)=>{
          console.log(error)

        }
      )
      console.log('otp:', this.otpFormControl.value);    }
  }

}
