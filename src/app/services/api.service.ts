import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Observable, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";

import { User } from '../models/User';
import { Channel } from '../models/channel';

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
    return this.http.post<User[]>(`${this.URL}/user/Create`, user, httpOptions)
    .pipe(catchError(this.handleError("signupFetch")),tap(user => {return user}))
  }

  login(user: User): any
  {
    return this.http.put(`${this.URL}/user/`, user, httpOptions)
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
}
