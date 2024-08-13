import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject, OnInit } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  itemClicked;
  open=false

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
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

  isLoginOpen(event){
    this.open = event.value
  }
}
