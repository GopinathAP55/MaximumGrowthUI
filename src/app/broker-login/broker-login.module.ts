import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrokerLoginComponent } from './broker-login/broker-login.component';
import { BrokerRoutingModule } from './broker-routing.module';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    BrokerLoginComponent,
    
  ],
  imports: [
    CommonModule,
    BrokerRoutingModule,
    MatButtonModule
  ]
})
export class BrokerLoginModule { }
