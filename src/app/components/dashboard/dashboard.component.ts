import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignalService } from 'src/app/services/signal.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  openBrokerPage =false
  showFiller = false;
  itemClicked=''

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

  logOut(){
    this.signalService.isLogin.set(false)
    this.route.navigateByUrl('/login')
  }

}
