import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import * as SockJS from 'sockjs-client';
import {Client, Stomp, StompSubscription} from '@stomp/stompjs';
import {filter, first, switchMap} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {

  private client;
  private state: BehaviorSubject<SocketClientState>;

  constructor() {
    this.client = Stomp.over(new SockJS("/api/v1/socket-channel"));
    this.state = new BehaviorSubject<SocketClientState>(SocketClientState.ATTEMPTING);
    this.client.connect({}, () => {
      this.state.next(SocketClientState.CONNECTED);
    });
  }

  private connect(): Observable<Client> {
    return new Observable<Client>(observer => {
      this.state.pipe(filter(state => state === SocketClientState.CONNECTED))
        .subscribe(() => {
          observer.next(this.client);
        });
    });
  }

  onMessage(topic: string): Observable<any> {
    return this.connect().pipe(first(), switchMap(client => {
      return new Observable<any>(observer => {
        const subscription: StompSubscription = client.subscribe(topic, message => {
          observer.next(JSON.parse(message.body));
        });
        return () => client.unsubscribe(subscription.id);
      });
    }));
  }
}

export enum SocketClientState {
  ATTEMPTING, CONNECTED
}
