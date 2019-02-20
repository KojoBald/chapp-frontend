import { Component } from '@angular/core';
import { MatDialogRef, MatChipInputEvent, MatSnackBar } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-update-channel',
  templateUrl: './update-channel.component.html',
  styleUrls: ['./update-channel.component.css']
})
export class UpdateChannelComponent {
  loading: boolean = false;
  readonly userKeySeparators = [ENTER, COMMA];
  name: string = '';
  users: any[] = [];

  constructor(private dialogRef: MatDialogRef<UpdateChannelComponent>, private snackBar: MatSnackBar) { }

  updateChannel() {
    console.log('creating channel', this.name)
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.dialogRef.close();
      let snackBarRef = this.snackBar.open('Channel name Updated', '', {
        duration: 3000
      })
      snackBarRef.onAction().subscribe(() => {
      })
    }, 3000)
  }

}
