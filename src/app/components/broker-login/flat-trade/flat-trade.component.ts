import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-flat-trade',
  templateUrl: './flat-trade.component.html',
  styleUrls: ['./flat-trade.component.css']
})
export class FlatTradeComponent implements OnInit  {

  traderForm:FormGroup;

  constructor(private formBuilder: FormBuilder,private apiService :ApiServiceService ){

  }
  ngOnInit() {
    this.traderForm = this.formBuilder.group({
      clientId: ['', Validators.required,],
      APIKey:[''],
      APISecret:[''],
      _id:[''],
      name:['FlatTrade']
    })
    this.apiService.getBroker('FlatTrade').subscribe({
      next:res=>{
        this.traderForm.patchValue(res[0])
        if(this.traderForm.get('_id').value){

          this.traderForm.get('clientId').disable()
        }
      },
      error:err=>{
        console.log(err)
      }
    })
  }

  onSubmit(){
    let data= this.traderForm.value
    
    this.apiService.addBroker((data)).subscribe({
      next: res => {
       console.log(res)
      },
      error:err=>{
       console.log(err)
      }
      
     // Do something with the received value
   });

  }

  deleteBroker(){
    console.log('tdelete')
    this.apiService.deleteBroker('FlatTrade').subscribe({
      next:res=>{
        console.log(res)
        this.traderForm.reset()
      },
      error:err=>{
        console.log(err)
      }
    })
  }
}
