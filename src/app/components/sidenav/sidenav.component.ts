import { Component } from '@angular/core';
import { MatDialog } from '@angular/material'
import { CreateChannelComponent } from '../modals/create-channel/create-channel.component'
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  routeProfile(){
    this.router.navigateByUrl('/profile/:id');
  };
  routeChannel(){
    this.router.navigateByUrl('/channel/:id');
  };
  routeDm(){
    this.router.navigateByUrl('/dm/:id');
  };

  constructor(private dialog: MatDialog, private router: Router) { }

  openCreateChannelDialog() {
    let dialogRef = this.dialog.open(CreateChannelComponent, {
      width: '50vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('closed', result);
    })
  }
}
