import { Injectable } from '@angular/core';
import { Subscriber, Observable } from 'rxjs';
import { Channel } from '../models/Channel';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private _subscribers: Subscriber<String>[] = [];
  title: string;
  channel: Channel | null;
  isChannelAdmin: boolean = false;
  headerTitle: Observable<string>;

  constructor() { 
    this.headerTitle = new Observable(observer => {
      this._subscribers.push(observer);
      return {
        unsubscribe() {
          this._subscribers.splice(
            this._subscribers.indexOf(observer), 1
          )
        }
      }
    })
  }

  setHeaderTitle(title: string) {
    this.title = title;
    this._subscribers.forEach(subscriber => subscriber.next(title));
  }

  setChannel(channel: Channel | null) {
    this.channel = channel;
    if(channel !== null) {
      this.isChannelAdmin = parseInt(sessionStorage.getItem('userId')) === channel.admin
    }
  }
}
