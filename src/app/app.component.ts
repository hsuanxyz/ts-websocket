import { Component, OnInit } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
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
    this.messageService.receive().subscribe(data => {
      console.log(data);
    })
  }


}
