import { Injectable, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SignalService {

  public isLogin = signal(false)

  public formValue= signal('')


  constructor() { }
}
