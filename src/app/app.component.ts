import { Component, OnInit } from '@angular/core';
import { Receive, Send } from './interfaces/message'
import { MessageService } from './services/message.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'ts-websocket';

  constructor(private messageService: MessageService) {
    this.messageService.connect();
  }

  ngOnInit(): void {
    this.messageService.receive(Receive.CONNECT).subscribe(data => {
      console.log(data);
    })
    this.messageService.receive(Receive.USER_LIST).subscribe(data => {
      console.log(data);
    })
    this.messageService.send<Send.JOINED>(Send.JOINED, 'test')
    this.messageService.send<Send.GET_USER_LIST>(Send.GET_USER_LIST)
  }


}
