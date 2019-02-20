import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateChannelComponent } from '../modals/create-channel/create-channel.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  constructor(private dialog: MatDialog) {}

  openCreateChannelDialog() {
    let dialogRef = this.dialog.open(CreateChannelComponent, {
      width: '50vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('closed', result); 
    })
  }
}
