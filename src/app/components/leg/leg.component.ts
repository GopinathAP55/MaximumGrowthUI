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


  isOn: boolean = false;
  ngOnInit() {
    console.log(this.legValue)

  }

  
  toggle(value,value1,value2): void {
    this.isOn = !this.isOn;
   let  label = this.isOn ? value1 : value2;
    console.log(this.legValue)

    this.buySellValue.emit(label)
  }

delete(){
  console.log()
this.deleteLeg.emit()
}

}
