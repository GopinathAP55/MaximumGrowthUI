import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { NotificationService } from 'src/app/services/notification-service';

@Component({
  selector: 'app-iifl',
  templateUrl: './iifl.component.html',
  styleUrls: ['./iifl.component.css']
})
export class IiflComponent {
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
      APISecret:['',Validators.required],
      _id:[''],
      name:['IIFL'],
      marketAPIKey:['',Validators.required],
      marketAPISecret:['',Validators.required]
    })
    this.isLoading = true
    this.apiService.getBroker('IIFL').subscribe({
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
    if(data['_id']==''){
      delete data['_id']
    }
    this.isLoading =true
    this.apiService.addBroker((data)).subscribe({
      next: res => {
       console.log(res)
       this.notificationService.showNotification(res.message || 'Saved Successfully','success');
       this.isLoading =false
      },
      error:err=>{
       console.log(err)
       this.notificationService.showNotification(err.message || 'Creation failed','error');
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
