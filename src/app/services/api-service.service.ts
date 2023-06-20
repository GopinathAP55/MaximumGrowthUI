import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
 


  private apiUrl = 'http://ec2-13-48-193-217.eu-north-1.compute.amazonaws.com:3000/api/getAllUsers'; // Replace with your API endpoint URL
  private localURL = 'http://localhost:3000/api'
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  generateOTP(data) : Observable<any>{
    let payload = {
      'phoneNumber' : data
    }
    return this.http.post<any>(`${this.localURL}/send-otp`,payload)
  }

  verifyOtp(data) : Observable<any>{
    let payload = {
      'otp' : data
    }
    return this.http.post<any>(`${this.localURL}/verify-otp`,payload)
  }
}
