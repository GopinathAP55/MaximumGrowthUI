import { Component } from '@angular/core';

@Component({
  selector: 'app-broker-login',
  templateUrl: './broker-login.component.html',
  styleUrls: ['./broker-login.component.css']
})
export class BrokerLoginComponent {
selectedTrader;
showBroker=true

  openTrade(val){
    console.log(val)
    this.selectedTrader=val
    this.showBroker=false
  }

}
