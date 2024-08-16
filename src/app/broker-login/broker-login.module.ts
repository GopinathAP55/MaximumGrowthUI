import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrokerLoginComponent } from './broker-login/broker-login.component';
import { BrokerRoutingModule } from './broker-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module'



@NgModule({
  declarations: [
    BrokerLoginComponent,
    
  ],
  imports: [
    CommonModule,
    BrokerRoutingModule,
    AngularMaterialModule
  ]
})
export class BrokerLoginModule { }
