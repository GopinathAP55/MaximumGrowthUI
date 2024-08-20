import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { NotificationService } from 'src/app/services/notification-service';
import { SignalService } from 'src/app/services/signal.service';

@Component({
  selector: 'app-broker-login',
  templateUrl: './broker-login.component.html',
  styleUrls: ['./broker-login.component.css']
})


export class BrokerLoginComponent implements OnInit {
  @Output() onLoginSuccess =new EventEmitter<any>()

  constructor(private apiService : ApiServiceService,
    private notificationService : NotificationService,
    public signalService : SignalService,
    private route : Router
    ){

  }

  brokerArray =[]
  isLoading = false;
  ngOnInit(): void {
    
    this.brokerArray = this.signalService.brokerList()
  
   
    
  }

  login(data){
    this.isLoading = true

    switch(data.name){
      case 'AC Agarwal':
      if(sessionStorage.getItem(data.name)){
        this.notificationService.showNotification( `${data.name} already loggedIn`,'warning');
        this.isLoading = false
        break;
      }
      let payload = { 
        "secretKey": data.APISecret,
        "appKey": data.APIKey,
        "source": "WebAPI"
      }

     
        this.apiService.brokerLoginAcagarwal(payload).subscribe({
          next:res=>{
            this.notificationService.showNotification(res.message || `${data.name} Login success`,'success');
            sessionStorage.setItem('AC Agarwal',res.result.token)
            this.signalService.numberOfBrokerLoggedIn.set(this.signalService.numberOfBrokerLoggedIn()+1)
            this.isLoading = false
            this.signalService.routeToTableAfterLogin.next('')

          },
          error:err=>{
            this.notificationService.showNotification(err.message || `${data.name} Login error`,'error');
            this.isLoading = false
          }
        })
    }

    // const apiKey = data.APIKey; // Replace with your API Key if needed
    // const redirectUri = 'http://maximumgrowth.in'; // Replace with your Redirect URI
    // const responseType = 'code'; // Authorization code flow

    // // URL might differ based on Finvasia’s login page URL and query parameters
    // const finvasiaLoginUrl = `https://trade.shoonya.com?api_key=${apiKey}&response_type=${responseType}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    
    // window.location.href = finvasiaLoginUrl;

    // let payload = {
    //   'userid'   : data.clientId,
    //   'password' : '',
    //   'twoFA'    : '',
    //   'vendor_code' : data.vendor_code,
    //   'api_secret' : data.APIKey,
    //   'imei'       : data.imei
    //   }
    //   console.log(data)
    // this.apiService.finvasiaLogin(payload).subscribe({
    //   next : res=>{
    //     console.log(res)
    //   },
    //   error:err=>{
    //     console.log(err)
    //   }
    // })
  }

  isAlreadyLoggedIn(broker){
    if(sessionStorage.getItem(broker['name'])){
      return broker['name']
    }else{
      return ''
    }
  }

}
