import { Component, effect, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignalService } from './services/signal.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  onClickLogin =false
  constructor(private router : Router,public signalService :SignalService ){


    effect(() => {
      console.log(`The changes is: ${this.signalService.isLogin()})`);
    });
  }
  ngOnInit(): void {
    console.log('app')


  }
  
  title = 'MG-UI';

  login(){
    this.onClickLogin = true
    this.router.navigateByUrl('/login')

  }

  signUp(){
    this.router.navigateByUrl('/signup')

  }

  
}
