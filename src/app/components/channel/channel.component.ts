import { Component, OnInit } from '@angular/core';
import { ChannelMessage } from 'src/app/models/ChannelMessage';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {
  channelId: number = 0
  channelName: string = ''
  messages: ChannelMessage[] = []
  messageInput: string = ''

  constructor(private route: ActivatedRoute, private api: ApiService, private headerService: HeaderService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.headerService.setHeaderTitle('loading');
      this.channelId = params.id
      this.api.getChannel(params.id)
        .subscribe(channel => {
          this.channelName = channel.name;
          this.headerService.setHeaderTitle(channel.name);
        })
      this.api.getChannelMessages(params.id)
        .subscribe((messages = []) => {
          this.messages = messages
        })
    })
  }

  sendMessage() {
    this.api.sendChannelMessage(this.channelId, { text: this.messageInput, userId: parseInt(sessionStorage.getItem('userId')) })
      .subscribe(({ message }) => {
        console.log('new message', message);
        this.messages.push(message);
      })
  }

  onMessageDelete(messageId) {
    this.messages = this.messages.filter(message => message.id !== messageId)
  }
}
