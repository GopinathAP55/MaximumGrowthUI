import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private toaster : ToastrService) {}

  showNotification(message: string, panelClass:string, action: string = 'Close', duration: number = 30000) {


    switch(panelClass){
      case 'success':
        this.toaster.success(message, '');
        break;
      case 'error':
        this.toaster.error(message, '');
        break;
      case 'warning':
        this.toaster.warning(message, '');
        break;

    }
  }  
}