import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './auth/authGuard';
import { NavigationComponent } from './components/navigation/navigation.component'

console.log('route')

const routes: Routes = [ 
 
  { path:'login',component :HomeComponent  },
  { path: 'dashboard', component: NavigationComponent  ,children:[
    {path:'', outlet:'broker-login', 
     loadChildren: () => import('./broker-login/broker-login.module').then(m => m.BrokerLoginModule), canActivateChild: [AuthGuard]
     
    },
    {path:'', outlet:'broker-setup', 
    loadChildren: () => import('./broker-setup/broker-setup.module').then(m => m.BrokerSetupModule), canActivateChild: [AuthGuard]
    
   },

  ],  canDeactivate: [AuthGuard] }, //
  { path:'',component:HomeComponent}


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

