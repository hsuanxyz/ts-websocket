import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { SendArgumentsType } from '../core/message-ts-util';
import { MessageBody, MessageReceiveData, MessageSendData, Receive, Send } from '../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private ws: WebSocketSubject<MessageBody<Receive | Send>>;
  private received$ = new Subject<MessageBody<Receive>>();

  constructor() { }

  connect() {
    this.ws = webSocket({
      url: 'ws://localhost:8080/ws'
    });
    this.ws.subscribe(data => this.received$.next(data as MessageBody<Receive>));
  }

  receive<K extends Receive>(type: K): Observable<MessageReceiveData[K]> {
    return this.received$.pipe(
      filter(message => message.type === type),
      map(message => message.data)
    ) as Observable<MessageReceiveData[K]>;
  }

  send<K extends Send>(...args: SendArgumentsType<K>) {
    const [type, data] = args;
    this.ws.next(
      {
        type,
        data
      }
    );
  }



}
