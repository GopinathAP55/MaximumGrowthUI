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

  constructor(public signalService : SignalService,private route : Router){

  }

  menuItemClicked(item: string) {
    // Implement logic for the clicked item
    console.log('Clicked:', item);
    // Add your logic here, such as navigating to a route, performing an action, etc.
  }

  menuItemClickedSideNav(item: string) {
    // Implement logic for the clicked item
    console.log('Clicked:', item);
    // Add your logic here, such as navigating to a route, performing an action, etc.
  }

  // Function to toggle the side menu
  toggleMenu() {
    // Logic to toggle the side menu
    // Implement this based on your requirements
    // Example: You can use ViewChild to toggle the sidenav
  }

  logOut(){
    this.signalService.isLogin.set(false)
    this.route.navigateByUrl('/login')
  }

}
