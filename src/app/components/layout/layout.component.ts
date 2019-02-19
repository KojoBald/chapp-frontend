import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScreenSizeService, ScreenSize } from '../../services/screen-size.service'
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy {
  private _screenSizeSubscription: Subscription;
  screen: ScreenSize = ScreenSize.Web;
  
  routeProfile(){
    this.router.navigateByUrl('/profile/:id');
  };
  routeGlobal(){
    this.router.navigateByUrl('/channel/:id');
  };
  routeDm(){
    this.router.navigateByUrl('/dm/:id');
  };

  constructor(private _screenSize: ScreenSizeService, private router: Router) {}

  ngOnInit() {
    this._screenSizeSubscription = this._screenSize.subscribe(screen => {
      this.screen = screen;
    });
    this.router.navigateByUrl('/channel/:id');
  }

  ngOnDestroy() {
    this._screenSizeSubscription.unsubscribe()
  }
}