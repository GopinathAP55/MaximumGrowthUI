
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NotificationService } from '../notification-service';

@Injectable({
    providedIn: 'root'
})
export class MarketDataSocketService {



    private socket: WebSocket;
    private dataSubject: Subject<any>;
    private refreshSubject: Subject<any>;
    constructor(private notificationService : NotificationService) {
        this.dataSubject = new Subject<any>();
        this.refreshSubject = new Subject<any>();
    }

    connect(url: string): void {
        this.socket = new WebSocket(url);

        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            if (message.event === 'notification') {
                const orderData = message.data;
                this.notificationService.showNotification(orderData.message,orderData.status)
            }

            if (message.event === 'refresh') {
                this.refreshSubject.next('refresh')
            }
           
            this.dataSubject.next(message);
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        this.socket.onclose = () => console.log('WebSocket connection closed');
    }

    getRefreshSubject(): Observable<any> {
        console.log('refresh')
        return  this.refreshSubject.asObservable();
    }

    getDataStream(): Observable<any> {
        console.log('stream')
        return this.dataSubject.asObservable();
    }

    disconnect(url: string): void {
        console.log('disconnect')
        if (this.socket) {
            this.socket.close();
          }
    }

}



















