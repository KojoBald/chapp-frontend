import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScreenSizeService } from '../services/screen-size.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy {
  private _screenSizeSubscription: Subscription;

  constructor(private _screenSize: ScreenSizeService) { }

  ngOnInit() {
    this._screenSizeSubscription = this._screenSize.subscribe(screen => {
      console.log('size changed', screen);
    })
  }

  ngOnDestroy() {
    this._screenSizeSubscription.unsubscribe()
  }
}
