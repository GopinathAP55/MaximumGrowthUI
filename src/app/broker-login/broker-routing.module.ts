import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrokerLoginComponent } from './broker-login/broker-login.component';

const routes: Routes = [
  { path: '', component: BrokerLoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrokerRoutingModule { }
