import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ScreenSizeService, ScreenSize } from '../../services/screen-size.service'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  private _screenSizeSubscription: Subscription;
  public screen: ScreenSize = ScreenSize.Web;

  constructor(private screenSizeService: ScreenSizeService) { }

  ngOnInit() {
    this._screenSizeSubscription = this.subscribeToScreenChanges();
  }

  ngOnDestroy() {
    this._screenSizeSubscription.unsubscribe();
  }

  subscribeToScreenChanges() {
    return this.screenSizeService.subscribe((screenSize: ScreenSize) => {
      this.screen = screenSize;
    })
  }
}
