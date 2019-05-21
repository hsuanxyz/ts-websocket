import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private ws: WebSocketSubject<any>;
  private received$ = new Subject<any>();

  constructor() { }

  connect() {
    this.ws = webSocket({
      url: 'ws://localhost:8080/ws'
    });
    this.ws.subscribe(data => this.received$.next(data))
  }

  receive() {
    return this.received$.asObservable();
  }

  send(type: string, data: any) {
    this.ws.next(
      {
        type,
        data
      }
    );
  }
}
