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


  public niftyData = signal(0)

  public niftyOpen = signal(0)

  public bankNiftyData = signal(0)

  public bankNiftyOpen = signal(0)

  public niftyItData = signal(0)

  public niftyItOpen = signal(0)

  public midcapNiftyData = signal(0)

  public midcapNiftyOpen = signal(0)


  constructor() {

   
   }

  getLoginChanges() {
    return this.routeToTableAfterLogin.asObservable();
  }
}
