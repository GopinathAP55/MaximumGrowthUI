
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
    private positionSubject: Subject<any>;

    constructor(private notificationService : NotificationService) {
        this.dataSubject = new Subject<any>();
        this.refreshSubject = new Subject<any>();
        this.positionSubject  = new Subject<any>();
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
                console.log('ref frim socket')
                this.refreshSubject.next('refresh')
            }

            if(message.event =='marketDepth'){

                this.dataSubject.next(message.data);
            }

            if(message.event =='position'){

                this.positionSubject.next(message.data);
            }
           
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
    getPositionSubject(): Observable<any> {
        console.log('refresh')
        return  this.positionSubject.asObservable();
    }
    disconnect(url: string): void {
        console.log('disconnect')
        if (this.socket) {
            this.socket.close();
          }
    }

}



















