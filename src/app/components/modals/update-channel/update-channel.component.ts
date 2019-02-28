import { Component, ViewChild } from '@angular/core';
import { MatDialogRef, MatChipInputEvent, MatSnackBar, MatAutocompleteSelectedEvent } from '@angular/material';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import _debounce from 'lodash.debounce'
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-update-channel',
  templateUrl: './update-channel.component.html',
  styleUrls: ['./update-channel.component.css']
})
export class UpdateChannelComponent {
  loading: boolean = false;
  name: string = '';
  users: any[] = [];
  userOptions: User[] = [];

  @ViewChild('huh') usersInput;

  constructor(
    private dialogRef: MatDialogRef<UpdateChannelComponent>,
    private snackBar: MatSnackBar,
    private api: ApiService,
    private router: Router,
    private headerService: HeaderService
  ) { }

  updateChannel() {
    this.loading = true;
    let channel = this.headerService.channel;
    this.api.updateChannel(channel.id, { name: this.name, users: this.users.map(user => user.id) })
      .subscribe(response => {
        this.loading = false;
        this.dialogRef.close();
        console.log(response)
      })
  }

  deleteChannel() {
    this.loading = true;
    this.api.deleteChannel(this.headerService.channel.id)
      .subscribe(response => {
        this.loading = false;
        this.dialogRef.close();
        console.log(response);
      })
  }

  addUser({ option }: MatAutocompleteSelectedEvent) {
    this.users.push(option.value)
    this.usersInput.nativeElement.value = ''
    this.userOptions = []
  }

  removeUser(user) {
    let index = this.users.indexOf(user)
    if(index >= 0) this.users.splice(index, 1)
  }

  searchForUsers = _debounce(({ target: { value }}) => {
    this.api.searchForUser(value)
      .subscribe(users => {
        this.userOptions = users;
      })
  }, 500)
}
