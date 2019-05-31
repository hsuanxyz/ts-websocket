import { Component, OnInit } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd'
import { MessageListener } from './core/message-listeners'
import { MessageListenersManager } from './core/message-listeners-manager'
import { Receive, Send } from './interfaces/message'
import { MessageService } from './services/message.service'

const planeSvg = `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1559045085399" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3854" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M998.976 554.3232C1031.232 539.6032 1031.328 515.7952 998.976 501.0432L122.88 101.3312C90.624 86.6112 64.448 103.5072 64.384 138.4832L64 426.9952 773.568 527.6672 64 628.3392 64.384 916.8832C64.448 952.1152 90.528 968.7872 122.88 954.0352L998.976 554.3232Z" p-id="3855"></path></svg>`

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent extends MessageListenersManager implements OnInit {
  isCollapsed = false;
  username = 'Username'
  userList = [
    {
      username: 'HanMeimei',
      lastMessage: {
        form: 'HanMeimei',
        content: 'Hello！My name isHan Meimei Hello！My name isHan Meime',
        time: Date.now()
      }
    },
    {
      username: 'LiLei',
      lastMessage: {
        form: 'LiLei',
        content: 'Hello！My name isHan Meimei',
        time: Date.now()
      }
    }
  ]
  constructor(public messageService: MessageService, private iconService: NzIconService) {
    super(messageService);
    this.iconService.addIconLiteral('icon:plane', planeSvg);
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
