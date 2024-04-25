import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
 

   // Replace with your API endpoint URL
  private apiUrl = 'http://localhost:3000/api/mg'
  constructor(private http: HttpClient) {}





  getData(data): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAllAlgo?day=${data}`);
  }
  addAlgo(data): Observable<any> {
    console.log('addalgo')
    return this.http.post<any>(`${this.apiUrl}/addAlgo`,data);
  }

  deleteAlgo(data): Observable<any> {
    console.log('delete')
    console.log(data)
    return this.http.delete<any>(`${this.apiUrl}/deleteAlgo?name=${data}`);
  }

  generateOTP(data) : Observable<any>{
    let payload = {
      'phoneNumber' : data
    }
    return this.http.post<any>(`${this.apiUrl}/send-otp`,payload)
  }

  verifyOtp(data) : Observable<any>{
    let payload = {
      'otp' : data
    }
    return this.http.post<any>(`${this.apiUrl}/verify-otp`,payload)
  }
}
