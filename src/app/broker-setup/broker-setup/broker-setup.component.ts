import { Component } from '@angular/core';

@Component({
  selector: 'app-broker-setup',
  templateUrl: './broker-setup.component.html',
  styleUrls: ['./broker-setup.component.css']
})
export class BrokerSetupComponent {
  selectedTrader;
  showBroker=true
  
    openTrade(val){
      
      console.log('val')
      this.selectedTrader=val
      this.showBroker=false
    }
}
