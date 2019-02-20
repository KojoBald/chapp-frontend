import { Component } from '@angular/core';
import { MatDialogRef, MatChipInputEvent, MatSnackBar } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Channel } from '../../../models/channel';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.css']
})
export class CreateChannelComponent {
  loading: boolean = false;
  readonly userKeySeparators = [ENTER, COMMA];
  name: string = '';
  users: any[] = [];

  constructor(private dialogRef: MatDialogRef<CreateChannelComponent>, private snackBar: MatSnackBar, private ApiService: ApiService) { }

  createChanne() {
    this.loading = true;
    setTimeout(() => {
      //TODO: make an actual api call here instead of a timeout
      this.loading = false; 
      this.dialogRef.close();
      let snackBarRef = this.snackBar.open(`Channel "${this.name}" Created!`, 'Go to Channel', {
        duration: 3000
      })
      snackBarRef.onAction().subscribe(() => {
        //TODO: go to new channel here
      })
    }, 3000)
  }

  addUser({ input, value }: MatChipInputEvent) {
    if((value || '').trim()) {
      this.users.push({ name: value.trim() })
    }
    if(input) {
      input.value = ''
    }
  }

  removeUser(user) {
    console.log('removing user');
    let index = this.users.indexOf(user);
    if(index >= 0) this.users.splice(index, 1);
  }

  createChannel(name) : void
  {
    event.preventDefault();
    let channel: Channel = 
    {
      name: name
    }
    this.ApiService.createChannel(channel)
    .subscribe(newChannel => console.log(newChannel))
  }
}
