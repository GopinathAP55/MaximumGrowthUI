import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { NotificationService } from 'src/app/services/notification-service';

@Component({
  selector: 'app-finvasia',
  templateUrl: './finvasia.component.html',
  styleUrls: ['./finvasia.component.css']
})
export class FinvasiaComponent {

  traderForm:FormGroup;
  isLoading = false
  hide = true;
  hide1 = true;
  hide2 = true;
  hide3 = true;
  constructor(private formBuilder: FormBuilder,private apiService :ApiServiceService , private notificationService : NotificationService){

  }
  ngOnInit() {
    this.traderForm = this.formBuilder.group({
      clientId: ['', Validators.required,],
      APIKey:['',Validators.required],
   
      _id:[''],
      name:['Finvasia'],
      vendor_code:['',Validators.required],
      imei:['',Validators.required]
    })
    this.isLoading = true
    this.apiService.getBroker('Finvasia').subscribe({
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

  deleteBroker(id){
    console.log('tdelete')
    this.isLoading = true
    this.apiService.deleteBroker(id).subscribe({
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
