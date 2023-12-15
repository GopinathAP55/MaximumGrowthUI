import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-legs-setting-dialog',
  templateUrl: './legs-setting-dialog.component.html',
  styleUrls: ['./legs-setting-dialog.component.css']
})
export class LegsSettingDialogComponent implements OnInit{


  inputValue;
  @Output() dialogValueEmitter = new EventEmitter<any>()

  constructor(
    public dialogRef: MatDialogRef<LegsSettingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit() {

 }

 onClickDone(): void {
   this.dialogValueEmitter.emit(this.inputValue)
   this.dialogRef.close();
  }

  onClickNo(){
    this.dialogRef.close();

  }




}
