import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-flat-trade',
  templateUrl: './flat-trade.component.html',
  styleUrls: ['./flat-trade.component.css']
})
export class FlatTradeComponent implements OnInit  {

  traderForm:FormGroup;

  constructor(private formBuilder: FormBuilder){

  }
  ngOnInit() {
    this.traderForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      apiKey:[''],
      apiSecret:['']
    })
  }

  onSubmit(){

  }

  

}
