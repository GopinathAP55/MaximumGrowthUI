import { NgModule } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { TableComponent} from './components/table/table.component'
import { LoginComponent } from './components/login/login.component'
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './auth/authGuard';
import { NavigationComponent } from './components/navigation/navigation.component'
import { BrokerLoginModule } from './broker-login/broker-login.module';

console.log('route')

const routes: Routes = [ 
 
  { path:'login',component : LoginComponent },
  { path: 'dashboard', component: NavigationComponent ,canActivate: [AuthGuard] ,children:[
    {path:'', outlet:'broker-login', 
     loadChildren: () => import('./broker-login/broker-login.module').then(m => m.BrokerLoginModule),
     
    }
  ]}, //
  { path:'',component:HomeComponent}


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

