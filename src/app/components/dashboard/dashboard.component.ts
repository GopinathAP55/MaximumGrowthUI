import { Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef } from '@angular/core';
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
     componentRef.instance.legValue = event
     componentRef.instance.deleteLeg.subscribe(()=>{
      console.log('remove')
      componentRef.destroy()
     })

     componentRef.instance.buySellValue.subscribe((val)=>{
      componentRef.instance.legValue.buySell = val
     })
  }


 
  logOut(){
    this.signalService.isLogin.set(false)
    this.route.navigateByUrl('/login')
  }


}
