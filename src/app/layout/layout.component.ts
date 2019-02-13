import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScreenSizeService, ScreenSize } from '../services/screen-size.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy {
  private _screenSizeSubscription: Subscription;
  screen: ScreenSize = ScreenSize.Web;

  constructor(private _screenSize: ScreenSizeService) { }

  ngOnInit() {
    this._screenSizeSubscription = this._screenSize.subscribe(screen => {
      this.screen = screen;
    })
  }

  ngOnDestroy() {
    this._screenSizeSubscription.unsubscribe()
  }
}
