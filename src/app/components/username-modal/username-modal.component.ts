import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd'

@Component({
  selector: 'app-username-modal',
  templateUrl: './username-modal.component.html',
  styleUrls: ['./username-modal.component.less']
})
export class UsernameModalComponent {

  @Input() username: string;

  constructor(private nzModalRef: NzModalRef) { }

  confirm() {
    this.nzModalRef.close(this.username);
  }

  cancel() {
    this.nzModalRef.destroy();
  }

}
