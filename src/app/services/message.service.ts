import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs'
import { filter } from 'rxjs/operators'
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { SendArgumentsType } from '../core/message-ts-util'
import { MessageReceiveData, MessageSendData} from '../interfaces/message'

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

  receive<K extends keyof MessageReceiveData>(type: K): Observable<MessageReceiveData[K]> {
    return this.received$.pipe(
      filter(message => message.type === type)
    ) as Observable<MessageReceiveData[K]>
  }

  send<K extends keyof MessageSendData>(...args: SendArgumentsType<K>) {
    const [type, data] = args;
    this.ws.next(
      {
        type,
        data
      }
    );
  }

}
