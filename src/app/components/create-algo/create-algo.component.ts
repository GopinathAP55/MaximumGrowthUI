import { Component, ComponentRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef,AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LegComponent } from '../leg/leg.component';
import { LegsSettingDialogComponent } from '../legs-setting-dialog/legs-setting-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { NotificationService } from 'src/app/services/notification-service';

@Component({
  selector: 'app-create-algo',
  templateUrl: './create-algo.component.html',
  styleUrls: ['./create-algo.component.css']
})
export class CreateAlgoComponent implements OnInit ,OnChanges {
  isLoading = false
  createAlgo: FormGroup;
  legForm:FormControl

  instrumentArray=['Banknifty','Finnifty','Sensex','Nifty','Midcpnifty']
  segmentArray=['Options','Futures']
  strikeArray=['ATM','OTM']
  isMIS=['MIS','NRML']
  isPosition = false
  durationArray=['STBT/BTST','(N) days before expiry']
  mtmArray=['none','MTM in percentage','MTM in total amount']
  mtmActionArray=['Square Off All Positions']
  trailingStoplossArray=['none','Trailing Stoploss','Lock Profit','Trail Profit','Lock & Trail Profit']
  dynamicComponentRefs: ComponentRef<LegComponent>[] = [];
  checkboxArray = ['isNoMatchingOfPremium','isPremiumRange','isPremiumCloseTo','isMatchPremium']
  entryOrderTypeArray=['Market(M)','Limit(L)/Stoploss limit(SL-L)']
  pointsOrPercentageArray=['Points','Percentage']
  delayArray=['no delay','Delay entry of buy position','Delay entry of buy position']
  entryArray=['Average entry price','LTP']
  exitArray=['Average exit price','LTP']

  showLeg =false
  checkboxForm: FormGroup;
  legsArray=[]
  @ViewChild('legComponent', { read: ViewContainerRef }) legComponent: ViewContainerRef;
  
  @Output() addLeg = new EventEmitter<any>()

  @Output() onSubmitForm = new EventEmitter<any>()

  @Input() selectedAlgo;

  @Input() edit


  toggleValue: string = 'off';
  checkboxColor ='primary'
  leg=''
  constructor(private formBuilder: FormBuilder, public dialog : MatDialog , private apiService : ApiServiceService,private notificationService:NotificationService){
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.edit) {
     if(!changes.edit.currentValue){
      this.reset()
     }
    }
  }

  ngOnInit() {
    console.log(this.selectedAlgo)
   
    this.initializeForm()
    if(!this.edit){
      this.reset()
      this.selectedAlgo=''
    }

   

    if(this.selectedAlgo){
      console.log(this.legComponent)
      //this.createAlgo = this.selectedAlgo.algo
      this.createAlgo.patchValue(this.selectedAlgo.algo)
      console.log(this.createAlgo.value.legsArray)
     
  }



    this.createAlgo.get('intradayOrPosition').valueChanges.subscribe((value) => {
      console.log('Value changed:', value);
      if(value=='positional'){
        this.isPosition =true
      }else{
        this.isPosition =false
      }
    });

    this.createAlgo.get('selectedMTM').valueChanges.subscribe((value) => {
      console.log('Value changed:', value);
      if(value!='none'){
        this.createAlgo.get('mtmValue').enable()
        this.createAlgo.get('selectedAction').enable()
      }else{
        this.createAlgo.get('mtmValue').disable()
        this.createAlgo.get('selectedAction').disable()
      }
    });

    this.createAlgo.get('mtmFixedStoploss').valueChanges.subscribe((value) => {
      console.log('Value changed:', value);
      if(value!='none'){
        this.createAlgo.get('mtmStoplossValue').enable()
        this.createAlgo.get('selectedStoplossAction').enable()
      }else{
        this.createAlgo.get('mtmStoplossValue').disable()
        this.createAlgo.get('selectedStoplossAction').disable()
      }
    });



    //premuim matching
   
  }

  ngAfterViewInit() {
    // Access the child components here
   console.log(this.legComponent)
   if(this.createAlgo.value.legsArray.length > 0){
    this.createAlgo.value.legsArray.forEach((ele)=>{
      console.log(ele)
      this.addLegComponent(ele)
      console.log('add')
    })
}
  }
  

  addLegComponent(val){
   console.log( this.createAlgo.value)
    this.showLeg = false
    const componentRef =  this.legComponent.createComponent(LegComponent);
    componentRef.instance.legValue =  this.createAlgo.value
    if(val){
      componentRef.instance.finalLegValue = val

    }else{

      componentRef.instance.finalLegValue =  {}
    }
   
    this.dynamicComponentRefs.push(componentRef)

     componentRef.instance.deleteLeg.subscribe(()=>{

      const index = this.dynamicComponentRefs.indexOf(componentRef);
      if (index !== -1) {
        componentRef.destroy();
        this.dynamicComponentRefs.splice(index, 1);
      }
      console.log('remove')
     })

     componentRef.instance.buySellValue.subscribe((val)=>{
      componentRef.instance.legValue[val.buttonName] = val.labelValue 
     // this.getValuesFromInstance()
     })
     componentRef.instance.cloneLeg.subscribe(()=>{
      const index = this.dynamicComponentRefs.indexOf(componentRef);
      if (index !== -1) {
        const componentRefClone =  this.legComponent.createComponent(LegComponent);
        componentRefClone.instance.legValue =  componentRef.instance.legValue
        this.dynamicComponentRefs.push(componentRefClone)
      }
      this.clone()
     })

  }

  getValuesFromInstance(){
    this.createAlgo.value.legsArray=[]
    this.dynamicComponentRefs.forEach((dynamicComponentRef, index) => {
      const dynamicComponentInstance = dynamicComponentRef.instance;
      const value = dynamicComponentInstance.finalLegValue;
      this.createAlgo.value.legsArray.push(value)
      console.log(`Value from Dynamic Component ${index + 1}:`, value);
    });
  }

  onChangeCheckbox(checkbox){

    this.checkboxArray.forEach((val)=>{
      if(val!=checkbox){
        this.createAlgo.get(val)?.setValue(false);
      }
    })
  }
  onSubmit(){
    this.getValuesFromInstance()

    const dialogRef = this.dialog.open(LegsSettingDialogComponent, {
      width: '400px',
      data: { 'label' : 'Submit form',
              'fromSubmit':true        
      }
    });

    
    dialogRef.componentInstance.dialogValueEmitter.subscribe((emittedValue: string) => {
    

      console.log('Received value from dialog:', emittedValue);


      this.onSubmitForm.emit()
      this.createAlgo.value.day = emittedValue
      console.log(this.createAlgo)
      let data = {
        name:this.createAlgo.value.algoName,
        algo:this.createAlgo.value,
        day:this.createAlgo.value.day
      }
      if(this.selectedAlgo){
        data['objectId']=this.selectedAlgo._id
        this.isLoading = true
        this.apiService.editAlgo((data)).subscribe({
          next:res=>{
            console.log(res)
            this.notificationService.showNotification('Algo edited successfully','success')
            this.isLoading = false
          },
          error:error=>{
            console.log(error)
            this.notificationService.showNotification('Error in algo editing','error')
            this.isLoading = false
          }
        })
      }else{
        this.isLoading = true
        this.apiService.addAlgo((data)).subscribe({
          next: res => {
            this.notificationService.showNotification('Algo created successfully','success')
           console.log(res)
           this.isLoading = false
          },
          error:err=>{
            this.notificationService.showNotification('Error in algo creating','error')
           console.log(err)
           this.isLoading = false
          }
          
         // Do something with the received value
       });

      }
      // Do something with the received value
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
      // Additional actions after the dialog is closed if needed
    });
    if (this.createAlgo.valid) {
      this.getValuesFromInstance()
     console.log('submit')

      // You can send the form data to a backend or perform other actions here
    } else {
      // Handle invalid form
      console.error('Form is invalid');
    }
  }

  clone(){
    console.log('test')
  }
  reset(){
    if(this.createAlgo){

      this.createAlgo.reset()
     
    }
 
    console.log(this.dynamicComponentRefs)
    this.dynamicComponentRefs.forEach((val,index)=>{
      val.destroy();
    
    })

    this.dynamicComponentRefs=[]    
  }

  initializeForm(){
    this.createAlgo = this.formBuilder.group({
      algoName: ['', Validators.required],
      selectedInstrument: ['Banknifty', Validators.required],
      selectedSegment:['Options',Validators.required],
      optionValue:['CE'],
      buySell:['Buy'],
      selectedStrike:['ATM',Validators.required],
      quantity:[1,Validators.required],
      isMIS:['MIS'],
      legs:['Legs'],
      specificStrikeSelection:['None'],  
      intradayOrPosition:['intraday'],
      selectedDuration:['STBT/BTST'],
      spot :['Spot'],

      //start time end time variables
      startHour:['09',[Validators.required, Validators.min(9), Validators.max(15),Validators.maxLength(2)]],
      startMin:['15',[Validators.required, Validators.min(0), Validators.max(59),Validators.maxLength(2)]],
      startSec:['00',[Validators.required, Validators.min(0), Validators.max(59),Validators.maxLength(2)]],
      endHour:['15',[Validators.required, Validators.min(9), Validators.max(15),Validators.maxLength(2)]],
      endMin:['15',[Validators.required, Validators.min(0), Validators.max(59),Validators.maxLength(2)]],
      endSec:['00',[Validators.required, Validators.min(0), Validators.max(59),Validators.maxLength(2)]],
      nextDayHour:['15',[Validators.required, Validators.min(9), Validators.max(15),Validators.maxLength(2)]],
      nextDayMin:['15',[Validators.required, Validators.min(0), Validators.max(59),Validators.maxLength(2)]],
      nextDaySec:['00',[Validators.required, Validators.min(0), Validators.max(59),Validators.maxLength(2)]],
      
      daysBeforeExpiry:['0',[Validators.required, Validators.min(0), Validators.max(5),Validators.maxLength(1)]],

      //mtm variables

      selectedMTM:['none'],
      mtmFixedStoploss:['none'],
      mtmValue: new FormControl([Validators.required] ),
      selectedAction: new FormControl({value: 'Square Off All Positions', disabled: true}, Validators.required),

      mtmStoplossValue: new FormControl( Validators.required),
      selectedStoplossAction: new FormControl({value: 'Square Off All Positions', disabled: true}, Validators.required),
      trailingStoploss:['none'],
      mtmStoplossType:['MTM in percentage'],
      mtmStoplossX:[0],
      mtmStoplossY:[0],
      lockProfitY:[0],
      profitReachesX:[0],
      trailProfitA:[0],
      trailProfitB:[0],

      //primium matchting variables
      isNoMatchingOfPremium:[true],
      isPremiumRange:[false],
      isPremiumCloseTo:[false],
      isMatchPremium:[false],

      maximumDifferenceValue:['',Validators.required],
      premiumCloseToValue: ['',Validators.required],
      permiumRangeOneValue:['',Validators.required],
      permiumRangeTwoValue:['',Validators.required],

      //advanced settings
      entryOrderType:['Market(M)'],
      pointsOrPercentage:['Points'],
      entryBufferIn:[],
      entryBufferValue:[0],
      exitOrderType:['Market(M)'],
      exitBufferIn:[],
      exitBufferValue:[0],
      exitPlacementDelaySL:[0,[ Validators.min(0), Validators.max(60),Validators.maxLength(2)]],
      exitPlacementDelayLeg:[0,[ Validators.min(0), Validators.max(60),Validators.maxLength(2)]],


      entryOrderDelay:['no delay'],
      entryDelayValue:[3,[Validators.min(3), Validators.max(60),Validators.maxLength(2)]],

      exitDelayValue:[3,[ Validators.min(3), Validators.max(60),Validators.maxLength(2)]],

      exitOrderDelay:['no delay'],
      calcEntry:['Average entry price'],
      calcExit:['Average exit price'],
      trailingFrequencyInterval:[0,[ Validators.min(0), Validators.max(60),Validators.maxLength(2)]],
      isExit:[false],
      legsArray:[],
      isPosition:[false]

      
    });
  }
}
