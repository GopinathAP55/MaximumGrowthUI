
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MarketDataSocketService {



    private socket: WebSocket;
    private dataSubject: Subject<any>;

    constructor() {
        this.dataSubject = new Subject<any>();
    }

    connect(url: string): void {
        this.socket = new WebSocket(url);

        this.socket.onmessage = (event) => {
           
            const data = JSON.parse(event.data);
            this.dataSubject.next(data);
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        this.socket.onclose = () => console.log('WebSocket connection closed');
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



















