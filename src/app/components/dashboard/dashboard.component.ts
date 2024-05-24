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
  itemClicked='none'
  legValue
  dynamicComponentRefs: ComponentRef<LegComponent>[] = [];
  selectedAlgoData;
  edit =false
  @ViewChild('legComponent', { read: ViewContainerRef }) legComponent: ViewContainerRef;

  constructor(public signalService : SignalService,private route : Router){

  }

  menuItemClicked(item: string,val:string) {
    this.itemClicked = item
    console.log('Clicked:', item);
    if(this.itemClicked=='one' && val==''){
      this.edit=true
    }else if(this.itemClicked=='one' && val=='dashboard'){
      this.edit=false
      this.selectedAlgoData=''
    }

    // Add your logic here, such as navigating to a route, performing an action, etc.
  }

  menuItemClickedSideNav(item: string) {
    console.log('Clicked:', item);
  }

  loadAlgo(algoData){
    console.log(algoData)
    this.selectedAlgoData = algoData
    this.menuItemClicked('one','')
    this.edit =true

  }
  // Function to toggle the side menu
  toggleMenu() {
  
  }

  
  


 
  logOut(){
    this.signalService.isLogin.set(false)
    localStorage.removeItem('jwtToken')
    localStorage.clear();
    this.route.navigateByUrl('/login')
  }


}
