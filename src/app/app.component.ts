import { Component, OnInit } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'ts-websocket';
  ws: WebSocketSubject<any>;

  constructor() {
    this.ws = webSocket({
      url: 'ws://localhost:8080/ws'
    });
  }

  ngOnInit(): void {
    this.ws.subscribe(data => {
      console.log(data);
    });
  }


}
