import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Subscriber, Observable } from 'rxjs';
import { ChannelMessage } from '../models/ChannelMessage';

@Injectable({
  providedIn: 'root'
})
export class PollingService {
  public _pollInterval
  public _id: number;
  private _type: PollType;
  private _lastPoll: Date
  private _subscribers: Subscriber<ChannelMessage[]>[] = [];
  constructor(private api: ApiService) { }

  private startPolling() {
    this._lastPoll = new Date();
    this._pollInterval = setInterval(() => {
      if(this._type === PollType.Channel) {
        this.api.getUpdatedChannelMessages(this._id, this._lastPoll.toISOString())
          .subscribe(messages => {
            this._subscribers.forEach(subscriber => subscriber.next(messages))
            this._lastPoll = new Date();
          })
      }
    }, 1000);
  }

  private stopPolling() {
    clearInterval(this._pollInterval);
  }

  connect(type: PollType, id: number): Observable<ChannelMessage[]> {
    this.stopPolling();
    this._type = type;
    this._id = id;
    let source = new Observable<ChannelMessage[]>(observable => {
      this._subscribers.push(observable);
      return {
        unsubscribe() {
          this._subscribers.splice(
            this._subscribers.indexOf(observable),
            1
          )
        }
      }
    })
    this.startPolling();
    return source;
  }
}

export enum PollType {
  Channel, DM
}
