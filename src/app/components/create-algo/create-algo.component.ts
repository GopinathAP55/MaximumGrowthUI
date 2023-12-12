import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-algo',
  templateUrl: './create-algo.component.html',
  styleUrls: ['./create-algo.component.css']
})
export class CreateAlgoComponent implements OnInit  {

  createAlgo: FormGroup;

  instrumentArray=['Bank nifty','Fin nifty']
  segmentArray=['Options','Futures']
  strikeArray=['ATM','OTM']


  toggleValue: string = 'off';


  constructor(private formBuilder: FormBuilder){

  }
  ngOnInit() {
    this.createAlgo = this.formBuilder.group({
      algoName: ['', Validators.required],
      selectedInstrument: ['', Validators.required],
      selectedSegment:['',Validators.required],
      optionValue:[],
      buySell:[],
      selectedStrike:['',Validators.required],
      quantity:['',Validators.required],



    
    });
  }

  onSubmit(){
    if (this.createAlgo.valid) {
      console.log(this.createAlgo.value);
      // You can send the form data to a backend or perform other actions here
    } else {
      // Handle invalid form
      console.error('Form is invalid');
    }
  }


}
