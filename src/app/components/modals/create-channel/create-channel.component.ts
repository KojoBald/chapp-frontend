import { Component, ViewChild } from '@angular/core';
import { MatDialogRef, MatChipInputEvent, MatSnackBar, MatAutocompleteSelectedEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

import { Channel } from '../../../models/Channel';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router'

import _debounce from 'lodash.debounce'
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.css']
})
export class CreateChannelComponent {
  loading: boolean = false;
  name: string = '';
  users: any[] = [];
  userOptions: User[] = [];

  @ViewChild('huh') usersInput;

  constructor(
    private dialogRef: MatDialogRef<CreateChannelComponent>, 
    private snackBar: MatSnackBar, 
    private api: ApiService,
    private router: Router 
  ) { }

  createChannel() {
    this.loading = true;
    this.api.createChannel({ 
      name: this.name,
      users: this.users.map(user => user.id),
      admin: null
    }).subscribe(({ channel }) => {
      this.loading = false;
      this.dialogRef.close();
      let snackBarRef = this.snackBar.open(`Channel "${this.name}" Created!`, 'Go to Channel', {
        duration: 3000
      })
      snackBarRef.onAction().subscribe(() => {
        this.router.navigateByUrl(`/channel/${channel.id}`)
      })
    })
  }

  addUser({ option }: MatAutocompleteSelectedEvent) {
    this.users.push(option.value)
    this.usersInput.nativeElement.value = ''
    this.userOptions = [];
  }

  removeUser(user) {
    console.log('removing user');
    let index = this.users.indexOf(user);
    if(index >= 0) this.users.splice(index, 1);
  }

  searchForUsers = _debounce(({ target: { value }}) => {
    this.api.searchForUser(value)
      .subscribe(users => {
        this.userOptions = users;
      });
  }, 500)
}
