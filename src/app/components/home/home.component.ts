import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  itemClicked;
  open=false


  constructor(){

  }
  
  ngOnInit(): void {

  }

  menuItemClicked(item: string) {
    this.open=true
    this.itemClicked = item
    console.log('Clicked:', item);
    // Add your logic here, such as navigating to a route, performing an action, etc.
  }
}
