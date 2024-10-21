import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LegsSettingDialogComponent } from '../legs-setting-dialog/legs-setting-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-leg',
  templateUrl: './leg.component.html',
  styleUrls: ['./leg.component.css']
})


export class LegComponent implements OnInit {

   legValue;
   finalLegValue;
  @Output() cloneLeg: EventEmitter<any> = new EventEmitter<any>();

  @Output() deleteLeg: EventEmitter<any> = new EventEmitter<any>();
  @Output() buySellValue: EventEmitter<any> = new EventEmitter<any>();
  legsArray = ['Legs', 'Premium Close', 'Premium > than', 'Premium < than', 'ATM%', 'Straddle Width', 'Straddle Premium']
  legs
  strikeArray = ['ATM', 'OTM']
  instrumentArray = ['Banknifty', 'Finnifty', 'Sensex', 'Nifty', 'Midcpnifty']
  isPremiumDialogOpen =false
  instrumentValueArray = [ {
    "instrument":'Banknifty',
    "lotQuantity":15
  },  {
    "instrument":'Finnifty',
    "lotQuantity":40
  },  {
    "instrument":'Sensex',
    "lotQuantity":10
  }, {
    "instrument":'Nifty',
    "lotQuantity":50
  },  {
    "instrument":'Midcpnifty',
    "lotQuantity":75
  }]

  targetAndStopLossArray =['none','%','pts','UL%','UL pts']
  squareOffArray =['Square Off Leg','Square Off All']
  selectedSquareOff =''

  trailingArray=['none','%','pts']
  selectedTrail='none';

  selectedTarget='none'
  selectedStoploss = 'none'


  quantity;
  calculatedQuantity:number;

  selectedInstrumentArray

  isOn: boolean = false;

  trailingTarget :number;
  stoploss:number;
  valueY :number;
  valueX :number
  selectedInstrument: any;
  buySell: any;
  optionValue: any;
  premium
  selectedStrike
  isMIS
  selectedLeg
  constructor( public dialog : MatDialog ,private formBuilder: FormBuilder){

  }

  ngOnInit() {

  }


  toggle(value, value1, value2): void {
    this.isOn = !this.isOn;
    let label = this.isOn ? value1 : value2;
   
    this[value] = label

    this.buySellValue.emit({
      labelValue: label,
      buttonName: value
    })
  }

  delete() {
    console.log()
    this.deleteLeg.emit()
  }


  calculateQuantityBasedOnLots(event){
    console.log('focusout')
    this.quantity = event.srcElement.value
    this.calculatedQuantity = this.selectedInstrumentArray[0].lotQuantity * this.quantity

  }

  onChangeInstrument(event){
    this.selectedInstrument = event.value
    this.selectedInstrumentArray=   this.instrumentValueArray.filter((val)=>val.instrument==this.selectedInstrument)
    this.calculatedQuantity = this.selectedInstrumentArray[0].lotQuantity * this.quantity

  }


  onChangeLeg(event){
    this.selectedLeg = event.value
    const dialogRef = this.dialog.open(LegsSettingDialogComponent, {
      width: '400px',
      data: { 'label' : event.value}
    });

    if(this.selectedLeg == 'Legs'){
      this.isPremiumDialogOpen =false

    }

    
    dialogRef.componentInstance.dialogValueEmitter.subscribe((emittedValue: string) => {
      this.premium = parseInt(emittedValue)
      if(this.premium){
        this.isPremiumDialogOpen =true
      }

      this.selectedStrike = parseInt(emittedValue)
      console.log('Received value from dialog:', emittedValue);
      // Do something with the received value
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
      // Additional actions after the dialog is closed if needed
    });
  }

  onChangeStoploss(event){
    let stoplossValue = event.value
    if(stoplossValue =='none'){
      this.stoploss=0
     
    }
     
      this.selectedStoploss = stoplossValue
    

  }

  onChangeTarget(event){
    let targetValue = event.value
    if(targetValue =='none'){
      this.trailingTarget=0
     
    }
    
      this.selectedTarget = targetValue

    
  }

  onChangeTrailing(event){
    let trailingValue = event.value
    if(trailingValue =='none'){
      this.valueX=0
      this.valueY=0

    }
     
      this.selectedTrail = trailingValue
    
  }

  manipulateData(event,label){
    console.log(event)
    console.log(label)
    this[label]= parseInt(event.srcElement.value)
  
  }

  clone(){
    this.cloneLeg.emit()

  }
  onChangeSquareOff(event){
    this.selectedSquareOff = event.value
   
  }

}
