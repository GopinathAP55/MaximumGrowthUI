
 import { MatSelectModule } from '@angular/material/select'
 import { AppComponent } from './app.component';
 import { AppRoutingModule } from './app-routing.module'

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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatButtonToggleModule } from '@angular/material/button-toggle';


import { TableComponent } from '../app/components/table/table.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CreateAlgoComponent } from './components/create-algo/create-algo.component';

@NgModule({
  declarations: [
         AppComponent,
         TableComponent,
         LoginComponent,
         DashboardComponent,
         CreateAlgoComponent
         
       ],
  imports: [
    MatButtonToggleModule,
    MatSelectModule,
    MatListModule,
    MatSidenavModule,
    MatMenuModule ,
    MatToolbarModule,
    AppRoutingModule,
    MatIconModule,
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
