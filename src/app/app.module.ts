// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import { MatSelectModule } from '@angular/material/select'
// import { MatToolbarModule } from '@angular/material/toolbar'



// @NgModule({
//   declarations: [
//     AppComponent,
//   ],
//   imports: [
//     BrowserModule,
//     BrowserAnimationsModule,
//     AppRoutingModule,
//     MatSelectModule,
//     MatSlideToggleModule,
//     MatToolbarModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }
 import { AppComponent } from './app.component';


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, RouterModule } from '@angular/router';


import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TableComponent } from '../app/components/table/table.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'
@NgModule({
  declarations: [
         AppComponent,
         TableComponent,
         LoginComponent,
         DashboardComponent
         
       ],
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSlideToggleModule,
    RouterModule,
    
  ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule { }
