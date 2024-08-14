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
  ngOnInit(): void {
    this.apiService.getBroker('').subscribe({
      next:res =>{
        console.log(res)
        this.brokerArray = res
        this.notificationService.showNotification(res.message || 'Loaded Successfully','success');

      },
      error:err=>{
        this.notificationService.showNotification(err.message || 'Failed to load','error');
      }
    }
     
    )
    
  }

  login(data){

    let payload = {
      'userid'   : data.clientId,
      'password' : '',
      'twoFA'    : '',
      'vendor_code' : data.vendor_code,
      'api_secret' : data.APIKey,
      'imei'       : data.imei
      }
      console.log(data)
    this.apiService.finvasiaLogin(payload).subscribe({
      next : res=>{
        console.log(res)
      },
      error:err=>{
        console.log(err)
      }
    })
  }



}
