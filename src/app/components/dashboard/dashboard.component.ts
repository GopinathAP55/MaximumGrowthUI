import { Component, ComponentFactoryResolver, ComponentRef, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { SignalService } from 'src/app/services/signal.service';
import { LegComponent } from '../leg/leg.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  openBrokerPage =false
  showFiller = false;
  itemClicked=''
  legValue
  dynamicComponentRefs: ComponentRef<LegComponent>[] = [];

  @ViewChild('legComponent', { read: ViewContainerRef }) legComponent: ViewContainerRef;

  constructor(public signalService : SignalService,private route : Router){

  }

  menuItemClicked(item: string) {
    this.itemClicked = item
    console.log('Clicked:', item);
    // Add your logic here, such as navigating to a route, performing an action, etc.
  }

  menuItemClickedSideNav(item: string) {
    console.log('Clicked:', item);
  }

  // Function to toggle the side menu
  toggleMenu() {
  
  }

  addLegComponent(event){
    this.legValue = event
    console.log(event)
    const componentRef =  this.legComponent.createComponent(LegComponent);
    this.dynamicComponentRefs.push(componentRef)
     componentRef.instance.legValue = event
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
      this.getValuesFromInstance()
     })
  }

  getValuesFromInstance(){
    this.dynamicComponentRefs.forEach((dynamicComponentRef, index) => {
      const dynamicComponentInstance = dynamicComponentRef.instance;
      const value = dynamicComponentInstance.legValue;
      console.log(`Value from Dynamic Component ${index + 1}:`, value);
    });
  }


 
  logOut(){
    this.signalService.isLogin.set(false)
    this.route.navigateByUrl('/login')
  }


}
