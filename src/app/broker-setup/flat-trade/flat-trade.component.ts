import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { NotificationService } from 'src/app/services/notification-service';

@Component({
  selector: 'app-flat-trade',
  templateUrl: './flat-trade.component.html',
  styleUrls: ['./flat-trade.component.css']
})
export class FlatTradeComponent implements OnInit  {

  traderForm:FormGroup;
  isLoading = false
  constructor(private formBuilder: FormBuilder,private apiService :ApiServiceService , private notificationService : NotificationService){

  }
  ngOnInit() {
    this.traderForm = this.formBuilder.group({
      clientId: ['', Validators.required,],
      APIKey:[''],
      APISecret:[''],
      _id:[''],
      name:['FlatTrade']
    })
    this.isLoading = true
    this.apiService.getBroker('FlatTrade').subscribe({
      next:res=>{
        this.isLoading = false
        this.traderForm.patchValue(res[0])
        if(this.traderForm.get('_id').value){

          this.traderForm.get('clientId').disable()
        }
      },
      error:err=>{
        console.log(err)
        
        this.isLoading = false

      }
    })
  }

  onSubmit(){
    let data= this.traderForm.value
    this.isLoading =true
    this.apiService.addBroker((data)).subscribe({
      next: res => {
       console.log(res)
       this.notificationService.showNotification('Create Successfully','success');
       this.isLoading =false
      },
      error:err=>{
       console.log(err)
       this.notificationService.showNotification(err || 'Creation failed','error');
       this.isLoading =false

      }
      
     // Do something with the received value
   });

  }

  deleteBroker(){
    console.log('tdelete')
    this.isLoading = true
    this.apiService.deleteBroker('FlatTrade').subscribe({
      next:res=>{
        console.log(res)
        this.traderForm.reset()
        this.notificationService.showNotification('Delete Successfully','success');
        this.isLoading = false
      },
      error:err=>{
        console.log(err)
        this.notificationService.showNotification('Deletion failed','error');
        this.isLoading = false
      }
    })
  }
}
