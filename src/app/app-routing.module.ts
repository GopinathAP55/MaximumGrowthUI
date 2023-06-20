import { NgModule } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'

console.log('route')

const routes: Routes = [ 
  {path:'',component:AppComponent},
  { path: 'dashboard', component: DashboardComponent },

];
console.log('route')
@NgModule({
  imports: [RouterModule.forRoot(routes),
  RouterModule.forChild([
  
  ])],
  exports: [RouterModule],
  providers:[
    ActivatedRoute,
    RouterModule
  ]
})
export class AppRoutingModule { }

