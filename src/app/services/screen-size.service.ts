import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscriber } from 'rxjs'
import { nextContext } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService extends Observable<ScreenSize> {
  private _screenSize: ScreenSize;
  private _subscribers: Subscriber<ScreenSize>[] = [];

  constructor(private breakpointObserver: BreakpointObserver) {
    super((observer) => {
      this._subscribers.push(observer);
      return {
        unsubscribe() {
          this._subscribers.splice(this._subscribers.indexOf(observer), 1)
        }
      }
    })
    breakpointObserver.observe([ Breakpoints.HandsetPortrait ])
      .subscribe(({ matches }) => matches ? this._triggerSubscribers(ScreenSize.Mobile) : null);
    breakpointObserver.observe([ Breakpoints.Tablet ])
      .subscribe(({ matches }) => matches ? this._triggerSubscribers(ScreenSize.Tablet) : null);
    breakpointObserver.observe([ Breakpoints.Web ])
      .subscribe(({ matches }) => matches? this._triggerSubscribers(ScreenSize.Web) : null)
  }  
  
  private _triggerSubscribers(screenSize: ScreenSize) {
    this._subscribers.forEach((sub) => sub.next(screenSize))
  }
}

export enum ScreenSize {
  Web = 'web', 
  Tablet = 'tablet',
  Mobile = 'mobile'
}
