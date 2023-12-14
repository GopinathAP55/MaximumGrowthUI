import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-leg',
  templateUrl: './leg.component.html',
  styleUrls: ['./leg.component.css']
})


export class LegComponent implements OnInit {

  @Input() legValue;
  @Output() deleteLeg: EventEmitter<any> = new EventEmitter<any>();
  @Output() buySellValue: EventEmitter<any> = new EventEmitter<any>();
  legsArray = ['Legs', 'Premium Close', 'Premium > than', 'Premium < than', 'ATM%', 'Straddle Width', 'Straddle Premium']
  strikeArray = ['ATM', 'OTM']
  instrumentArray = ['Banknifty', 'Finnifty', 'Sensex', 'Nifty', 'Midcpnifty']

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


  quantity;
  calculatedQuantity:number;

   selectedInstrumentArray

  isOn: boolean = false;
  ngOnInit() {
    console.log(this.legValue)
    this.quantity = this.legValue.quantity

    this.selectedInstrumentArray=   this.instrumentValueArray.filter((val)=>val.instrument==this.legValue.selectedInstrument)
    this.calculatedQuantity = this.selectedInstrumentArray[0].lotQuantity * this.legValue.quantity

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
    this.legValue.quantity = event.srcElement.value
    this.calculatedQuantity = this.selectedInstrumentArray[0].lotQuantity * this.legValue.quantity

  }

  onChangeInstrument(event){
    this.legValue.selectedInstrument = event.value
    this.selectedInstrumentArray=   this.instrumentValueArray.filter((val)=>val.instrument==this.legValue.selectedInstrument)
    this.calculatedQuantity = this.selectedInstrumentArray[0].lotQuantity * this.quantity

  }

}
