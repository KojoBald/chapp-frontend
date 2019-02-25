import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScreenSizeService, ScreenSize } from '../../services/screen-size.service'
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material'
import { UpdateProfileComponent } from '../modals/update-profile/update-profile.component';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy {
  private _screenSizeSubscription: Subscription;
  screen: ScreenSize = ScreenSize.Web;

  constructor(private _screenSize: ScreenSizeService, private router: Router, private dialog: MatDialog) {}

  ngOnInit() {
    this._screenSizeSubscription = this._screenSize.subscribe(screen => {
      this.screen = screen;
    });
    this.router.navigateByUrl('/channel/:id');
  }

  ngOnDestroy() {
    this._screenSizeSubscription.unsubscribe()
  }
  openUpdateUser() {
    let dialogRef = this.dialog.open(UpdateProfileComponent, {
      width: '50vw'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('closed', result);
    })
  }

  Logout()
  {
    sessionStorage.setItem('token', '');
<<<<<<< HEAD
    sessionStorage.setItem('userId', '');
=======
    // this.router.navigate(['/auth'])
>>>>>>> 4502dfffae63ca68f94e36d25f4e7956ae96f861
    location.reload();
  }
}