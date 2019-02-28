import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChannelMessage } from 'src/app/models/ChannelMessage';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit, OnDestroy {
  channelId: number = 0
  channelName: string = ''
  messages: ChannelMessage[] = [];
  messageInput: string = ''

  public _pollInterval;

  constructor(public route: ActivatedRoute, public api: ApiService, public headerService: HeaderService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.headerService.setHeaderTitle('loading');
      this.channelId = params.id
      this.stopPolling();
      this.messages = [];
      this.api.getChannel(params.id)
        .subscribe(channel => {
          this.headerService.setChannel(channel);
          this.channelName = channel.name;
          this.headerService.setHeaderTitle(channel.name);
        })
      this.api.getChannelMessages(params.id)
        .subscribe((messages = []) => {
          this.addToMessages(messages)
          this.startPolling();
        })
    })
  }

  sendMessage() {
    this.api.sendChannelMessage(this.channelId, { text: this.messageInput, userId: parseInt(sessionStorage.getItem('userId')) })
      .subscribe(({ message }) => {
        this.messages.push(message);
        this.messageInput = ''
      })
  }

  onMessageDelete(messageId) {
    this.messages = this.messages.filter(message => message.id !== messageId)
  }

  startPolling() {
    this._pollInterval = setInterval(() => {
      console.log('getting new messages');
      this.api.getChannelMessages(this.channelId)
        .subscribe((messages = []) => {
          this.addToMessages(messages);
        })
    }, 1000)
  }

  stopPolling() {
    clearInterval(this._pollInterval);
  }

  addToMessages(messages: ChannelMessage[]) {
    messages.forEach(message => {
      if(!this.messages.find(existingMessage => existingMessage.id === message.id)) {
        this.messages.push(message);
      }
    })
  }

  ngOnDestroy() {
    this.stopPolling();
  }
}
