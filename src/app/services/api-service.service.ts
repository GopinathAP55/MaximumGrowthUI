import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
 

  private apiUrl = 'https://maeciw2vn8.execute-api.ap-southeast-2.amazonaws.com/dev/getAlgo'; // Replace with your API endpoint URL
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
