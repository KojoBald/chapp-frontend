import { Component } from '@angular/core';
import { MatDialog } from '@angular/material'
import { CreateChannelComponent } from '../modals/create-channel/create-channel.component'
import { Router } from '@angular/router';
import { ManageUsersComponent } from '../modals/manage-users/manage-users.component';
import { UpdateChannelComponent } from '../modals/update-channel/update-channel.component';
import { DeleteChannelComponent } from '../modals/delete-channel/delete-channel.component';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  private id = sessionStorage.getItem("userId"); 

  ngOnInit() 
  {this.getmessageSender(this.id)}

  getmessageSender(id)
  {
    this.ApiService.getmessageSender(id)
    .subscribe(sender => console.log(sender)) 
  }

  routeProfile(){
    this.router.navigateByUrl('/profile/:id');
  };
  routeChannel(){
    this.router.navigateByUrl('/channel/:id');
  };
  routeDm(){
    this.router.navigateByUrl('/dm/:id');
  };

  constructor(private dialog: MatDialog, private router: Router, private ApiService: ApiService) { }

  openCreateChannelDialog() {
    let dialogRef = this.dialog.open(CreateChannelComponent, {
      width: '50vw'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('closed', result);
    })
  }
  openManageUsers() {
    let dialogRef = this.dialog.open(ManageUsersComponent, {
      width: '50vw'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('closed', result);
    })
  }
  openUpdateChannel() {
    let dialogRef = this.dialog.open(UpdateChannelComponent, {
      width: '50vw'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('closed', result);
    })
  }
  openDeleteChannel() {
    let dialogRef = this.dialog.open(DeleteChannelComponent, {
      width: '50vw'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('closed', result); 
    })
  }
}
