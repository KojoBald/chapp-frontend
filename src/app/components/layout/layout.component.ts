import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScreenSizeService, ScreenSize } from '../../services/screen-size.service'
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material'
import { UpdateProfileComponent } from '../modals/update-profile/update-profile.component';
import { HeaderService } from 'src/app/services/header.service';
import { UpdateChannelComponent } from '../modals/update-channel/update-channel.component';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy {
  public _screenSizeSubscription: Subscription;
  screen: ScreenSize = ScreenSize.Web;

  constructor(public _screenSize: ScreenSizeService, public router: Router, public dialog: MatDialog, public headerService: HeaderService) {}

  ngOnInit() {
    this._screenSizeSubscription = this._screenSize.subscribe(screen => {
      this.screen = screen;
    });
    this.router.navigateByUrl('/channel/1');
  }

  ngOnDestroy() {
    this._screenSizeSubscription.unsubscribe()
  }
  openUpdateUser() {
    let dialogRef = this.dialog.open(UpdateProfileComponent, {
      width: '50vw'
    });
  }

  openChannelSettings() {
    let dialogRef = this.dialog.open(UpdateChannelComponent, {
      width: '50vw'
    })
  }

  yup() {
    console.log('yup');
  }

  Logout()
  {
    sessionStorage.clear();
    location.reload();
  }
}