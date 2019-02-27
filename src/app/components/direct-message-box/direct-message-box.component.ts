import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { DirectMessage } from 'src/app/models/DirectMessage';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-direct-message-box',
  templateUrl: './direct-message-box.component.html',
  styleUrls: ['./direct-message-box.component.css']
})
export class DirectMessageBoxComponent implements OnInit {
  @Input() message: DirectMessage;
  @ViewChild('text') textInput;
  @Output() onMessageDelete: EventEmitter<number> = new EventEmitter<number>();
  user: User = { image: '', username: 'loading' }
  isEditing: boolean = false;
  isOwn: boolean = false;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getUser(this.message.from)
      .subscribe(user => {
        this.isOwn = parseInt(sessionStorage.getItem('userId')) === user.id
        this.user = user;
      })
  }

  updateMessage() {
    this.isEditing = false
    this.message.text = this.textInput.nativeElement.innerText
    this.api.updateMessage(this.message)
      .subscribe(response => {
        console.log(response)
      })
  }

  deleteMessage() {
    this.api.deleteDM(this.message.id)
      .subscribe(response => {
        this.onMessageDelete.emit(this.message.id)
      })
  }
}
