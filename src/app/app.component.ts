import { Component, HostListener, OnInit } from '@angular/core';
import { NzIconService, NzModalService } from 'ng-zorro-antd'
import { filter } from 'rxjs/operators'
import { UsernameModalComponent } from './components/username-modal/username-modal.component'
import { MessageListener } from './core/message-listeners'
import { MessageListenersManager } from './core/message-listeners-manager'
import { ChatMessage, Receive, Send, User } from './interfaces/message'
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
  userList: { username: User, lastMessage?: ChatMessage }[] = [];
  messages: ChatMessage[] = [];
  messageContent = '';
  constructor(public messageService: MessageService,
              private iconService: NzIconService,
              private nzModalService: NzModalService) {
    super(messageService);
    this.iconService.addIconLiteral('icon:plane', planeSvg);
  }

  ngOnInit(): void {
    this.messageService.connect();
  }

  openUsernameModal(rename = false) {
    const modalRef = this.nzModalService.create({
      nzContent: UsernameModalComponent,
      nzTitle: 'Username',
      nzFooter: null
    });

    modalRef.afterClose
    .pipe(filter((username: string) => username.trim() !== ''))
    .subscribe((username: string) => {
      if (rename) {
        this.rename(username)
      } else {
        this.join(username);
      }
    })
  }

  join(username: string) {
    this.username = username;
    this.messageService.send<Send.JOINED>(Send.JOINED, this.username);
    this.addUser(username);
  }

  rename(username: string) {
    const data = {
      user: this.username,
      newName: username
    };
    this.messageService.send<Send.RENAME>(Send.RENAME, data);
    this.username = username;
    this.renameUser(data);
  }

  sendMessage() {
    if (this.messageContent) {
      const message = {
        form: this.username,
        content: this.messageContent,
        time: Date.now()
      };
      this.messageService.send<Send.MESSAGE>(Send.MESSAGE, message);
      this.addMessage(message);
      this.messageContent = '';
    }
  }

  @HostListener('window:beforeunload')
  leave() {
    this.messageService.send<Send.LEAVE>(Send.LEAVE, this.username)
  }

  @MessageListener(Receive.CONNECT)
  onConnect() {
    this.messageService.send<Send.GET_USER_LIST>(Send.GET_USER_LIST);
    this.openUsernameModal();
  }

  @MessageListener(Receive.MESSAGE)
  addMessage(message: ChatMessage) {
    this.messages = [...this.messages, message];
    this.userList = this.userList.filter(user => user.username !== message.form);
    this.userList = [ { username: message.form, lastMessage: message }, ...this.userList ];
  }

  @MessageListener(Receive.USER_LIST)
  updateUserList(users: User[]) {
    this.userList = users.map(e => ({ username: e }))
  }

  @MessageListener(Receive.JOINED)
  addUser(user: User) {
    const currentUser = this.userList.find(e => e.username === user);
    if (!currentUser) {
      this.userList = [...this.userList, { username: user }];
    }
  }

  @MessageListener(Receive.LEAVE)
  removeUser(user: User) {
    this.userList = this.userList.filter(e => e.username !== user);
  }

  @MessageListener(Receive.RENAME)
  renameUser({user, newName}) {
    const currentUser = this.userList.find(e => e.username === user);
    if (currentUser) {
      currentUser.username = newName;
    }
  }

}
