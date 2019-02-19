import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Observable, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";

import { User } from '../models/user';
import { Channel } from '../models/channel';
import { Direct } from '../models/directMessage';

const httpOptions =
{
  headers: new HttpHeaders(
    {
      "Content-Type": "application/json",
      "Authorization": sessionStorage.getItem("token")
    })
}

@Injectable({
  providedIn: 'root'
})
export class ApiService 
{
  private URL: string = 'http//localhost:3005';
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) {}


  /***************************************************************
   * User
   ***************************************************************/
  signUp(user: User): any
  {
    return this.http.post<User[]>(`${this.URL}/user/`, user, httpOptions)
    .pipe(catchError(this.handleError("signupFetch")),tap(user => {return user}))
  }

  login(user: User): any
  {
    return this.http.put(`${this.URL}/user/login`, user, httpOptions)
    .pipe(catchError(this.handleError('Fetched')),tap(user => {return user}))
  }

  updateUser(user: User): any
  {
    return this.http.put(`${this.URL}/user/:id`, user, httpOptions)
    .pipe(catchError(this.handleError('updateFetch')),tap(user => {return user}))
  }

  deleteUser(id: number): any
  {
    return this.http.delete(`${this.URL}/user/:id`, httpOptions)
    .pipe(catchError(this.handleError('deleteFetched')),tap(user => {return user}))
  }

  getUser(): any
  {
    return this.http.get<User>(`${this.URL}/user/:id`, httpOptions)
    .pipe(catchError(this.handleError('getChannelFetch')),tap(user => {return user}))
  }

  getUsersChannels(): any
  {
    return this.http.get<User>(`${this.URL}/:id/channels`, httpOptions)
    .pipe(catchError(this.handleError('getChannelFetch')),tap(user => {return user}))
  }

  /***************************************************************
   * Channel
   ***************************************************************/
  createChannel(user: Channel): any
  {
    return this.http.post<Channel>(`${this.URL}/channel/`, user, httpOptions)
    .pipe(catchError(this.handleError('createFetch')),tap(user => {return user}))
  }

  getChannel(): any
  {
    return this.http.get<Channel>(`${this.URL}/channel/:id`, httpOptions)
    .pipe(catchError(this.handleError('getChannelFetch')),tap(user => {return user}))
  }

  updateChannel(user: Channel): any
  {
    return this.http.put(`${this.URL}/channel/:id`, user, httpOptions)
    .pipe(catchError(this.handleError('updateChannelFetch')),tap(user => {return user}))
  }

  deleteChannel(id: number): any
  {
    return this.http.delete(`${this.URL}/channel/:id`, httpOptions)
    .pipe(catchError(this.handleError('DeleteChannelFetch')),tap(user => {return user}))
  }

  getChannelUsers(id: number): any
  {
    return this.http.get<Channel>(`${this.URL}/channel/:id/users`, httpOptions)
    .pipe(catchError(this.handleError('getChannelUserFetch')),tap(user => {return user}))
  }

  inviteChannelUsers(user: Channel): any
  {
    return this.http.put(`${this.URL}/channel/:id/invite`, user, httpOptions)
    .pipe(catchError(this.handleError('inviteChannelFetch')),tap(user => {return user}))
  }

  /**************************************************************
   * UserMessages
  ***************************************************************/

 sendDirectMessage(user: Direct): any
 {
   return this.http.post<Direct>(`${this.URL}/user/message/`, user, httpOptions)
   .pipe(catchError(this.handleError('inviteChannelFetch')),tap(user => {return user}))
 }

 updateMessage(user: Direct): any
  {
    return this.http.put(`${this.URL}/user/message/:id`, user, httpOptions)
    .pipe(catchError(this.handleError('updateChannelFetch')),tap(user => {return user}))
  }

  deleteDM(id: number): any
  {
    return this.http.delete(`${this.URL}/user/message/:id`, httpOptions)
    .pipe(catchError(this.handleError('DeleteChannelFetch')),tap(user => {return user}))
  }

  getDMs(id: number): any
  {
    return this.http.get<Direct>(`${this.URL}/user/message/all/:userId`, httpOptions)
    .pipe(catchError(this.handleError('getChannelUserFetch')),tap(user => {return user}))
  }

}
