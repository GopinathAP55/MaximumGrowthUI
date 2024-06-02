import { NgModule } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { TableComponent} from './components/table/table.component'
import { LoginComponent } from './components/login/login.component'
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './auth/authGuard';
import { NavigationComponent } from './components/navigation/navigation.component'

console.log('route')

const routes: Routes = [ 
 
  { path:'login',component : LoginComponent },
  { path: 'dashboard', component: NavigationComponent ,canActivate: [AuthGuard]}, //
  { path:'table', component: TableComponent},
  { path:'',component:HomeComponent}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

