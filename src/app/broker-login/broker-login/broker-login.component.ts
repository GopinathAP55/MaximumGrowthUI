import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { NotificationService } from 'src/app/services/notification-service';

@Component({
  selector: 'app-broker-login',
  templateUrl: './broker-login.component.html',
  styleUrls: ['./broker-login.component.css']
})
export class BrokerLoginComponent implements OnInit {

  constructor(private apiService : ApiServiceService,private notificationService : NotificationService){

  }

  brokerArray :[]
  isLoading = false;
  ngOnInit(): void {
    this.isLoading = true
    this.apiService.getBroker('').subscribe({
      next:res =>{
        console.log(res)
        this.brokerArray = res
        this.notificationService.showNotification(res.message || 'Loaded Successfully','success');
        this.isLoading = false
      },
      error:err=>{
        this.isLoading = true
        this.notificationService.showNotification(err.message || 'Failed to load','error');
        this.isLoading = false
      }
    }
     
    )
    
  }

  login(data){
    this.isLoading = true

    switch(data.name){
      case 'AC Agarwal':
        this.apiService.brokerLogin({
          'name':'AC Agarwal',
          'marketAPIKey':"e42bb5ed272bb9cf7c6326",
          'marketAPISecret':"Tiuy575@Rz"
        }
        ).subscribe({
          next:res=>{
            this.notificationService.showNotification(res.message || `${data.name} Login success`,'success');
            this.isLoading = false
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



}
