import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import axios from 'axios';

import {Observable, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";

import { User } from '../models/User';
import { Channel } from '../models/Channel';
import { ChannelMessage } from '../models/ChannelMessage';
import { DirectMessage } from '../models/DirectMessage';

let httpOptions = {
  headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization" : sessionStorage.getItem("token") || ''
    })
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public URL: string = 'https://www.chapp-backend.herokuapp.com';
  public handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation, error);
      return of(result as T);
    };
  }

  constructor(public http: HttpClient) {}


  /***************************************************************
   * User
   ***************************************************************/
  signUp(user: User) {
    return this.http.post<HasUser & HasToken>(`${this.URL}/user/`, user, httpOptions)
      .pipe(
        catchError(this.handleError<HasToken & HasUser>('signup')),
        tap(({ token, user }) => {
          _setSession(token, user.id)
          return user
        })
      )
  }

  login(user: User) {
    return this.http.put<HasUser & HasToken>(`${this.URL}/user/login`, user, httpOptions)
      .pipe(
        catchError(this.handleError<HasToken & HasUser>("Fetched")),
        tap(({ token, user }) => {
          _setSession(token, user.id)
          return user
        })
      )
  }

  updateUser(user: User) {
    return this.http.put<HasUser>(`${this.URL}/user/${user.id}`, user, httpOptions)
      .pipe(
        catchError(this.handleError('updateFetch')),
        tap(user => user)
      )
  }

  deleteUser(userId: number) {
    return this.http.delete(`${this.URL}/user/${userId}`, httpOptions)
      .pipe(
        catchError(this.handleError('deleteFetched')),
        tap(user => user)
      )
  }

  getUser(userId: number) {
    return this.http.get<User>(`${this.URL}/user/${userId}`, httpOptions)
      .pipe(
        catchError(this.handleError<User>('getUserFetch')),
        tap(user => user)
      )
  }

  getUsersChannels(userId: number) {
    return this.http.get<Channel[]>(`${this.URL}/user/${userId}/channels`, httpOptions)
      .pipe(
        catchError(this.handleError<Channel[]>('getChannelFetch')),
        tap(user => user)
      )
  }

  searchForUser(query: string) {
    return this.http.get<User[]>(`${this.URL}/user?q=${query}`, httpOptions)
      .pipe(
        catchError(this.handleError<User[]>('userSearch')),
        tap(users => users)
      )
  }

  /***************************************************************
   * Channel
   ***************************************************************/
  createChannel(channel: Channel) {
    return this.http.post<HasChannel>(`${this.URL}/channel/`, channel, httpOptions)
      .pipe(
        catchError(this.handleError<HasChannel>('createFetch')),
        tap(channel => channel)
      )
  }

  getChannel(channelId: number) {
    return this.http.get<Channel>(`${this.URL}/channel/${channelId}`, httpOptions)
      .pipe(
        catchError(this.handleError<Channel>('getChannelFetch')),
        tap(user => user)
      )
  }

  updateChannel(channelId: number, channel: Channel) {
    return this.http.put<Channel>(`${this.URL}/channel/${channelId}`, channel, httpOptions)
      .pipe(
        catchError(this.handleError('updateChannelFetch')),
        tap(user => user)
      )
  }

  deleteChannel(channelId: number) {
    return this.http.delete<Channel>(`${this.URL}/channel/${channelId}`, httpOptions)
      .pipe(
        catchError(this.handleError('DeleteChannelFetch')),
        tap(user => user)
      )
  }

  getChannelUsers(channelId: number) {
    return this.http.get<Channel>(`${this.URL}/channel/${channelId}/users`, httpOptions)
      .pipe(
        catchError(this.handleError('getChannelUserFetch')),
        tap(users => users)
      )
  }

  inviteChannelUsers(userIds: number[], channelId) {
    return this.http.put(`${this.URL}/channel/${channelId}/invite`, { users: userIds }, httpOptions)
      .pipe(
        catchError(this.handleError('inviteChannelFetch')),
        tap(response => response)
      )
  }

  /**************************************************************
   * UserMessages 
  ***************************************************************/

 sendDirectMessage(message: DirectMessage, toUserId: number) {
   return this.http.post<HasMessage<DirectMessage>>(`${this.URL}/user/${toUserId}/message/`, message, httpOptions)
    .pipe(
      catchError(this.handleError<HasMessage<DirectMessage>>('inviteChannelFetch')),
      tap(response => response)
    )
 }

 updateMessage(message: DirectMessage) {
    return this.http.put(`${this.URL}/user/me/message/${message.id}`, message, httpOptions)
      .pipe(
        catchError(this.handleError('updateChannelFetch')),
        tap(response => response)
      )
  }

  deleteDM(messageId: number) {
    return this.http.delete(`${this.URL}/user/me/message/${messageId}`, httpOptions)
      .pipe(
        catchError(this.handleError('DeleteChannelFetch')),
        tap(response => response)
      )
  }

  getDMs(userId: number) {
    return this.http.get<DirectMessage[]>(`${this.URL}/user/${userId}/message/all/`, httpOptions)
      .pipe(
        catchError(this.handleError<DirectMessage[]>('getChannelUserFetch')),
        tap(response => response)
      )
  }

  getConversations() {
    console.log('getting conversations', sessionStorage.getItem('token'))
    return this.http.get<User[]>(`${this.URL}/user/me/message`, httpOptions)
      .pipe(
        catchError(this.handleError<User[]>('getConversations')),
        tap(response => response)
      )
  }

  /**************************************************************
   * ChannelMessages
  ***************************************************************/

  sendChannelMessage(channelId: number, message: ChannelMessage) {
    return this.http.post<HasMessage<ChannelMessage>>(`${this.URL}/channel/${channelId}/message`, message, httpOptions)
      .pipe(
        catchError(this.handleError<HasMessage<ChannelMessage>>('inviteChannelFetch')),
        tap(response => response)
      )
  }

  updateChannelMessage(channelId: number, message: ChannelMessage) {
    return this.http.put(`${this.URL}/channel/${channelId}/message/${message.id}`, message, httpOptions)
      .pipe(
        catchError(this.handleError('updateChannelFetch')),
        tap(response => response)
      )
  }

  deleteChannelMessage(channelId: number, messageId: number) {
    return this.http.delete(`${this.URL}/channel/${channelId}/message/${messageId}`, httpOptions)
      .pipe(
        catchError(this.handleError('DeleteChannelFetch')),
        tap(response => response)
      )
  }

  getChannelMessages(channelId: number) {
    return this.http.get<ChannelMessage[]>(`${this.URL}/channel/${channelId}/message/all`, httpOptions)
      .pipe(
        catchError(this.handleError<ChannelMessage[]>('getChannelUserFetch')),
        tap(response => response)
      )
  }

  getUpdatedChannelMessages(channelId: number, updatedAt) {
    return this.http.get<ChannelMessage[]>(`${this.URL}/channel/${channelId}/message?updatedAt=${updatedAt}`, httpOptions)
      .pipe(
        catchError(this.handleError<ChannelMessage[]>('getUpdatedMessageFetc')),
        tap(response => response)
      )
  }
}

function _setSession(token, userId) {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('userId', userId);
  httpOptions.headers = new HttpHeaders().set('Authorization', token).set('Content-Type', 'application/json')
}

export interface HasToken {
  token: string
}

export interface HasUser {
  user: User
}

export interface HasMessage<T> {
  message: T;
}

export interface HasChannel {
  channel: Channel;
}