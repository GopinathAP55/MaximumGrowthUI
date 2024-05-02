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
  squareOff:number

  trailingArray=['none','%','pts']
  trailing='none';

  selectedTarget='none'
  selectedStoploss = 'none'


  quantity;
  calculatedQuantity:number;

  selectedInstrumentArray

  isOn: boolean = false;

  target :number;
  stoploss:number;
  valueY :number;
  valueX :number

  constructor( public dialog : MatDialog ,private formBuilder: FormBuilder){

  }

  ngOnInit() {

    

    console.log(this.finalLegValue.selectedInstrument)
    if(!this.finalLegValue){

      this.finalLegValue.quantity = this.legValue.quantity
      this.finalLegValue.selectedInstrument = this.legValue.selectedInstrument
     
    }else{
      this.finalLegValue.quantity = this.finalLegValue.quantity
      this.finalLegValue.selectedInstrument = this.finalLegValue.selectedInstrument
    }
    this.quantity = this.legValue.quantity

    this.selectedInstrumentArray=   this.instrumentValueArray.filter((val)=>val.instrument==this.legValue.selectedInstrument)
    this.calculatedQuantity = this.selectedInstrumentArray[0].lotQuantity * this.quantity


  }


  toggle(value, value1, value2): void {
    this.isOn = !this.isOn;
    let label = this.isOn ? value1 : value2;
    console.log(this.legValue)

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
    this.finalLegValue.quantity = event.srcElement.value
    this.calculatedQuantity = this.selectedInstrumentArray[0].lotQuantity * this.legValue.quantity

  }

  onChangeInstrument(event){
    this.finalLegValue.selectedInstrument = event.value
    this.selectedInstrumentArray=   this.instrumentValueArray.filter((val)=>val.instrument==this.legValue.selectedInstrument)
    this.calculatedQuantity = this.selectedInstrumentArray[0].lotQuantity * this.quantity

  }


  onChangeLeg(event){
    this.finalLegValue.selectedLeg = event.value
    const dialogRef = this.dialog.open(LegsSettingDialogComponent, {
      width: '400px',
      data: { 'label' : event.value}
    });

    if(this.legValue.selectedLeg == 'Legs'){
      this.isPremiumDialogOpen =false

    }

    
    dialogRef.componentInstance.dialogValueEmitter.subscribe((emittedValue: string) => {
      this.finalLegValue.premium = parseInt(emittedValue)
      if(this.finalLegValue.premium){
        this.isPremiumDialogOpen =true
      }

      this.finalLegValue.selectedStrike = parseInt(emittedValue)
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
    }else{
      this.finalLegValue.selectedStopLoss =stoplossValue
    }

  }

  onChangeTarget(event){
    let targetValue = event.value
    if(targetValue =='none'){
      this.target=0
    }else{
      this.finalLegValue.selectedTarget =targetValue

    }
  }

  onChangeTrailing(event){
    let trailingValue = event.value
    if(trailingValue =='none'){
      this.valueX=0
      this.valueY=0

    }else{
      this.finalLegValue.selectedTrail =trailingValue  
     

    }
  }

  manipulateData(event,label){
    console.log(event)
    console.log(label)
    this.legValue[label]= parseInt(event.srcElement.value)
    console.log(this.legValue)
  }

  clone(){
    this.cloneLeg.emit()

  }
  onChangeSquareOff(event){

  }

}
