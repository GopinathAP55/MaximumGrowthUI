import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrokerSetupComponent } from './broker-setup/broker-setup.component';
import { AcAgarwalComponent } from './ac-agarwal/ac-agarwal.component'
import { FinvasiaComponent} from './finvasia/finvasia.component'
import { FlatTradeComponent } from './flat-trade/flat-trade.component'
import { ZerodhaComponent } from './zerodha/zerodha.component'
import { BrokerRoutingModule } from './broker-routing.module'
import { AngularMaterialModule } from '../angular-material/angular-material.module'


@NgModule({
  declarations: [
    BrokerSetupComponent,
    AcAgarwalComponent,
    ZerodhaComponent,
    FlatTradeComponent,
    FinvasiaComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    BrokerRoutingModule,
  ]
})
export class BrokerSetupModule { }
