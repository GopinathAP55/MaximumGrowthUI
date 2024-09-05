
 import { AppComponent } from './app.component';
 import { AppRoutingModule } from './app-routing.module'

import { NgModule } from '@angular/core';

import { HTTP_INTERCEPTORS  } from '@angular/common/http';


import { TableComponent } from '../app/components/table/table.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { CreateAlgoComponent } from './components/create-algo/create-algo.component';
import { LegComponent } from './components/leg/leg.component';
import { LegsSettingDialogComponent } from './components/legs-setting-dialog/legs-setting-dialog.component';
import { BrokerLoginComponent } from './components/broker-login/broker-login.component';

import { HomeComponent } from './components/home/home.component';

import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AuthGuard } from './auth/authGuard';
import { NotificationService } from './services/notification-service';
import { NavigationComponent } from './components/navigation/navigation.component';

import { AngularMaterialModule} from './angular-material/angular-material.module'
import { MarketDataSocketService } from './services/market-data/market-data-socket.service';
@NgModule({
  declarations: [
         AppComponent,
         TableComponent,
         LoginComponent,
         DashboardComponent,
         CreateAlgoComponent,
         LegComponent,
         LegsSettingDialogComponent,
         BrokerLoginComponent,
         HomeComponent,
         NavigationComponent,
         ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularMaterialModule
    
  ],
   providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },AuthGuard ,NotificationService,MarketDataSocketService],
   bootstrap: [AppComponent]
})
export class AppModule { }
