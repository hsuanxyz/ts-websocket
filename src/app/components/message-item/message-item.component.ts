import { Component, Input, OnInit } from '@angular/core';
import { ChatMessage } from '../../interfaces/message';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.less'],
  host: {
    '[class.outgoing]': 'outgoing'
  }
})
export class MessageItemComponent implements OnInit {

  @Input() outgoing = false;
  @Input() message: ChatMessage;

  constructor() { }

  ngOnInit() {
  }

}
