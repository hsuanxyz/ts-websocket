import { Component, OnInit } from '@angular/core';
import { MessageListener } from './core/message-listeners'
import { MessageListenersManager } from './core/message-listeners-manager'
import { Receive, Send } from './interfaces/message'
import { MessageService } from './services/message.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent extends MessageListenersManager implements OnInit {
  title = 'ts-websocket';

  constructor(public messageService: MessageService) {
    super(messageService);
    this.messageService.connect();
  }

  ngOnInit(): void {
    this.messageService.send<Send.JOINED>(Send.JOINED, 'test')
    this.messageService.send<Send.GET_USER_LIST>(Send.GET_USER_LIST)
  }

  @MessageListener(Receive.CONNECT)
  onConnect() {
    console.log('CONNECT')
  }

  @MessageListener(Receive.USER_LIST)
  updateUserList(data: string[]) {
    console.log(data);
  }

}
