import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-legs-setting-dialog',
  templateUrl: './legs-setting-dialog.component.html',
  styleUrls: ['./legs-setting-dialog.component.css']
})
export class LegsSettingDialogComponent implements OnInit{


  inputValue;
  submitValue

  daysArray = ['Monday','Tuesday','Wednesday','Thursday','Friday']
  @Output() dialogValueEmitter = new EventEmitter<any>()

  constructor(
    public dialogRef: MatDialogRef<LegsSettingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit() {
    console.log(this.data)

 }

 onClickDone(): void {
   this.dialogValueEmitter.emit(this.inputValue)
   this.dialogRef.close();
  }
  onClickSubmit(){
    this.dialogValueEmitter.emit(this.submitValue)
   this.dialogRef.close();
  }
  onClickNo(){
    this.dialogRef.close();

  }




}
