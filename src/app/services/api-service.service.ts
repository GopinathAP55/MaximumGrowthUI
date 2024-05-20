import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
 

   // Replace with your API endpoint URL
  private apiUrl = 'http://localhost:3000/api/mg'
  private apiUrl2 = 'http://localhost:3000/api'
  constructor(private http: HttpClient) {}





  getData(data): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAllAlgo?day=${data}`);
  }
  addAlgo(data): Observable<any> {
    console.log('addalgo')
    return this.http.post<any>(`${this.apiUrl}/addAlgo`,data);
  }

  editAlgo(data): Observable<any> {
    console.log('edit')
    return this.http.post<any>(`${this.apiUrl}/editAlgo`,data);
  }

  deleteAlgo(data): Observable<any> {
    console.log('delete')
    console.log(data)
    return this.http.delete<any>(`${this.apiUrl}/deleteAlgo?name=${data}`);
  }


  addBroker(data): Observable<any> {
    console.log('addbroker')
    return this.http.post<any>(`${this.apiUrl}/addBroker`,data);
  }

  getBroker(data): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getBroker?name=${data}`);
  }

  deleteBroker(data): Observable<any> {
    console.log('deltebroker')
    return this.http.delete<any>(`${this.apiUrl}/deleteBroker?name=${data}`);
  }

  generateOTP(data) : Observable<any>{
    let payload = {
      'phoneNumber' : data
    }
    return this.http.post<any>(`${this.apiUrl2}/send-otp`,payload)
  }

  login(data) : Observable<any>{
   
    return this.http.post<any>(`${this.apiUrl2}/login`,data)
  }

  verifyOtp(data) : Observable<any>{
    
    return this.http.post<any>(`${this.apiUrl2}/verify-otp`,data)
  }
}
