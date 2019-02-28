import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from '../services/header.service';
import { User } from '../models/User';
import { DirectMessage } from '../models/DirectMessage';

@Component({
  selector: 'app-direct-message',
  templateUrl: './direct-message.component.html',
  styleUrls: ['./direct-message.component.css']
})
export class DirectMessageComponent implements OnInit {
  user: User;
  messages: DirectMessage[] = []
  messageInput: string = ''

  constructor(public route: ActivatedRoute, public api: ApiService, public headerService: HeaderService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.headerService.setHeaderTitle('loading');
      this.headerService.setChannel(null);
      this.api.getUser(params.id)
        .subscribe(user => {
          this.user = user;
          this.headerService.setHeaderTitle(user.username);
        })
      this.api.getDMs(params.id)
        .subscribe((messages = []) => {
          this.messages = messages;
        })
    })
  }

  sendMessage() {
    this.api.sendDirectMessage({ text: this.messageInput }, this.user.id)
      .subscribe(({ message }) => {
        this.messageInput = '';
        this.messages.push(message);
      })
  }

  onMessageDelete(messageId) {
    this.messages = this.messages.filter(message => message.id !== messageId)
  }
}
