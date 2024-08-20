import { Injectable, signal } from '@angular/core';
import { Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalService {

  public routeToTableAfterLogin = new Subject<''>()

  public isLogin = signal(false)

  public formValue= signal('')

  public itemClicked = signal('none')

  public numberOfBrokerLoggedIn = signal(0)

  public brokerList = signal([])


  constructor() {

   
   }

  getLoginChanges() {
    return this.routeToTableAfterLogin.asObservable();
  }
}
