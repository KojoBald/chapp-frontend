import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ChannelMessage } from 'src/app/models/ChannelMessage';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {
  @Input() message: ChannelMessage;
  @ViewChild('text') textInput;
  @Output() onMessageDelete: EventEmitter<number> = new EventEmitter<number>();
  user: User = { image: '', username: 'loading' };
  isEditing: boolean = false;
  isOwn: boolean = false;

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.api.getUser(this.message.userId)
      .subscribe(user => {
        this.isOwn = parseInt(sessionStorage.getItem('userId')) === user.id
        this.user = user
      })
  }

  updateMessage() {
    this.isEditing = false
    this.message.text = this.textInput.nativeElement.innerText
    this.api.updateChannelMessage(this.message.channelId, this.message)
      .subscribe(response => {
        console.log(response);
      })
  }

  deleteMessage() {
    this.api.deleteChannelMessage(this.message.channelId, this.message.id)
      .subscribe(response => {
        this.onMessageDelete.emit(this.message.id);
      })
  }
}
