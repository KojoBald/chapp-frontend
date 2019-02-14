import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Observable, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";

import { Signup } from '../models/signup';
import { Login } from '../models/login';

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

  signUp(user: Signup): any
  {
    return this.http.post<Signup>(`${this.URL}user/Create`, user, httpOptions)
    .pipe(catchError(this.handleError("signupFetch")),tap(user => {return user}))
  }

  login(user: Login): any
  {
    return this.http.post<Login>(`${this.URL}user/`, user, httpOptions)
    .pipe(catchError(this.handleError('loginFetch')),tap(user => {return user}))
  }
}
