import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material'
import { CreateChannelComponent } from '../modals/create-channel/create-channel.component'
import { Router } from '@angular/router';
import { ManageUsersComponent } from '../modals/manage-users/manage-users.component';
import { UpdateChannelComponent } from '../modals/update-channel/update-channel.component';
import { DeleteChannelComponent } from '../modals/delete-channel/delete-channel.component';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/models/User';
import _debounce from 'lodash.debounce';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  channels: any[] = [];
  conversations: any[] = [];
  userOptions: User[] = [];

  constructor(private dialog: MatDialog, private router: Router, private api: ApiService) { }

  ngOnInit() {
    this.api.getUsersChannels(parseInt(sessionStorage.getItem('userId')))
      .subscribe(channels => {
        this.channels = channels.filter(channel => channel.id !== 1);
      })
    
    this.api.getConversations()
      .subscribe(conversations => {
        this.conversations = conversations;
      })
  }

  searchForUsers = _debounce(({ target: { value }}) => {
    this.api.searchForUser(value)
      .subscribe(users => {
        this.userOptions = users;
      });
  }, 500)

  autocompleteDisplay(user: User) {
    return user.username;
  }

  goToDm({ option: { value }}) {
    this.router.navigateByUrl(`/dm/${value.id}`)
  }

  openCreateChannelDialog() {
    let dialogRef = this.dialog.open(CreateChannelComponent, {
      width: '50vw'
    });
  }

  openManageUsers() {
    let dialogRef = this.dialog.open(ManageUsersComponent, {
      width: '50vw'
    });
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
