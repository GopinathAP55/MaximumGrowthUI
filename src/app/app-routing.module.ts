import { NgModule } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { TableComponent} from './components/table/table.component'
import { LoginComponent } from './components/login/login.component'

console.log('route')

const routes: Routes = [ 
 
  { path:'login',component : LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path:'table', component: TableComponent}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

