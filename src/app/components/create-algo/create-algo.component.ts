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
  entryOrderTypeArray=['Market','Limit']
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
  otmValues = Array.from({ length: (1000 - -1000) / 50 + 1 }, (_, i) => -1000 + i * 50);


  toggleValue: string = 'off';
  checkboxColor ='primary'
  leg=''
  positionData = []
  positionColumn =[{'key':'TradingSymbol', 'label':'TradingSymbol'},{'key':'NetAmount', 'label':'NetAmount'},
    {'key':'Quantity', 'label':'Quantity'},{'key':'BuyAmount', 'label':'BuyAmount'},{'key':'SellAmount', 'label':'SellAmount'}]
  disable 
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
    this.apiService.getPosition(this.selectedAlgo._id).subscribe({
      next : res=>{
        console.log(res)
        // for(const key in res[0]){
        //   this.positionColumn.push({'key':key, 'label':key})
        // }
        this.positionData = res

      },
      error:err=>{
        this.notificationService.showNotification(err.message,'error')
      }
    })
   

    if(this.selectedAlgo){
      this.createAlgo.patchValue(this.selectedAlgo.algo)
      // if(this.selectedAlgo.status =='NOT STARTED'){
      //   this.createAlgo.enable()
      //   this.disable = false
       
      // }else{
      //   this.createAlgo.disable()
      //   this.disable = true
      // }
      console.log(this.legComponent)
      //this.createAlgo = this.selectedAlgo.algo
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
  
    if(this.disable){
      componentRef.instance.isDisabled = this.disable
    }
    this.setLegValues(componentRef, this.createAlgo.value)
    
    if(val){
      this.setLegValues(componentRef, val)

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
      componentRef.instance[val.buttonName] = val.labelValue 
     // this.getValuesFromInstance()
     })
     componentRef.instance.cloneLeg.subscribe(()=>{
      const index = this.dynamicComponentRefs.indexOf(componentRef);
      if (index !== -1) {
        const componentRefClone =  this.legComponent.createComponent(LegComponent);
        this.setLegValues( componentRefClone.instance,  componentRef.instance)
        this.dynamicComponentRefs.push(componentRefClone)
      }
      this.clone()
     })

  }

  getValuesFromInstance(){
    this.createAlgo.value.legsArray=[]
    this.dynamicComponentRefs.forEach((dynamicComponentRef, index) => {
      let legsObject = {}

      const dynamicComponentInstance = dynamicComponentRef.instance;
      for (const property in dynamicComponentInstance) {
        if(dynamicComponentInstance[property] instanceof String || typeof dynamicComponentInstance[property] === 'string' || typeof dynamicComponentInstance[property] === 'number' ){

          legsObject[property] = dynamicComponentInstance[property]
        }
      }
      if(legsObject){

        this.createAlgo.value.legsArray.push(legsObject)
      }
      console.log(`Value from Dynamic Component ${index + 1}:`, legsObject);
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
        data['algoId']=this.selectedAlgo._id
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
      otmValue:[],
      
      //start time end time variables
      startHour:['09',[Validators.required, Validators.min(9), Validators.max(15),Validators.maxLength(2),Validators.minLength(2)]],
      startMin:['15',[Validators.required, Validators.min(0), Validators.max(59),Validators.maxLength(2),Validators.minLength(2)]],
      startSec:['00',[Validators.required, Validators.min(0), Validators.max(59),Validators.maxLength(2),Validators.minLength(2)]],
      endHour:['15',[Validators.required, this.endTimeValidator.bind(this),Validators.min(9), Validators.max(15),Validators.maxLength(2),Validators.minLength(2)]],
      endMin:['15',[Validators.required,this.endTimeValidator.bind(this), Validators.min(0), Validators.max(59),Validators.maxLength(2),Validators.minLength(2)]],
      endSec:['00',[Validators.required,this.endTimeValidator.bind(this), Validators.min(0), Validators.max(59),Validators.maxLength(2),Validators.minLength(2)]],
      nextDayHour:['15',[Validators.required, Validators.min(9), Validators.max(15),Validators.maxLength(2),Validators.minLength(2)]],
      nextDayMin:['15',[Validators.required, Validators.min(0), Validators.max(59),Validators.maxLength(2),Validators.minLength(2)]],
      nextDaySec:['00',[Validators.required, Validators.min(0), Validators.max(59),Validators.maxLength(2),Validators.minLength(2)]],
      
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
      exitPlacementDelaySL:[0,[ Validators.min(0), Validators.max(60),Validators.maxLength(2),Validators.minLength(2)]],
      exitPlacementDelayLeg:[0,[ Validators.min(0), Validators.max(60),Validators.maxLength(2),Validators.minLength(2)]],


      entryOrderDelay:['no delay'],
      entryDelayValue:[3,[Validators.min(3), Validators.max(60),Validators.maxLength(2),Validators.minLength(2)]],

      exitDelayValue:[3,[ Validators.min(3), Validators.max(60),Validators.maxLength(2),Validators.minLength(2)]],

      exitOrderDelay:['no delay'],
      calcEntry:['Average entry price'],
      calcExit:['Average exit price'],
      trailingFrequencyInterval:[0,[ Validators.min(0), Validators.max(60),Validators.maxLength(2),Validators.minLength(2)]],
      isExit:[false],
      legsArray:[],
      isPosition:[false]

      
    });
  }


  setLegValues(componentRef,val){
      for(const key in val){
        componentRef.instance[key] = val[key]
      }
    }
    backToTable(){
      this.onSubmitForm.emit()
    }

    endTimeValidator(control: FormControl) {
      const startHour = +this.createAlgo?.get('startHour')?.value || 0;
      const startMinute = +this.createAlgo?.get('startMin')?.value || 0;
      const startSecond = +this.createAlgo?.get('startSec')?.value || 0;
  
      const endHour = +this.createAlgo?.get('endHour')?.value || 0;
      const endMinute = +this.createAlgo?.get('endMin')?.value || 0;
      const endSecond = +control.value || 0;
  
      // Calculate total seconds for comparison
      const startTotalSeconds = startHour * 3600 + startMinute * 60 + startSecond;
      const endTotalSeconds = endHour * 3600 + endMinute * 60 + endSecond;
  
      if (endTotalSeconds < startTotalSeconds) {
        return { invalidEndTime: true };
      }
      return null;
    }
  
  }


