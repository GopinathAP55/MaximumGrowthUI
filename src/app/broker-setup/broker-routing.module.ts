import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrokerSetupComponent } from './broker-setup/broker-setup.component';

const routes: Routes = [
  { path: '', component: BrokerSetupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrokerRoutingModule { }
