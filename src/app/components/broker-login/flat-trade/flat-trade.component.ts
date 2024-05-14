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
      clientId: ['', Validators.required],
      APIKey:[''],
      APISecret:['']
    })
  }

  onSubmit(){
    let data= this.traderForm.value
    data.name='FlatTrade'
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

  

}
