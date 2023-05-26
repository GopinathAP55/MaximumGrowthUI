import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {


  private apiUrl = 'http://ec2-13-48-193-217.eu-north-1.compute.amazonaws.com:3000/api/users'; // Replace with your API endpoint URL

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
