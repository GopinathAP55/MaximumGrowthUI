import { NgModule } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { SignupComponent } from './login/signup/signup.component';
console.log('route')

const routes: Routes = [ 
  {path:'',component:AppComponent},
  { path: '/signup', component: SignupComponent },
];
console.log('route')
@NgModule({
  imports: [RouterModule.forRoot(routes),
  RouterModule.forChild([
    { path: '/signup', component: SignupComponent }
  ])],
  exports: [RouterModule],
  providers:[
    ActivatedRoute,
    RouterModule
  ]
})
export class AppRoutingModule { }

