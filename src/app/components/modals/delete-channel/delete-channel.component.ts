import { Component } from '@angular/core';
import { MatDialogRef, MatChipInputEvent, MatSnackBar } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-delete-channel',
  templateUrl: './delete-channel.component.html',
  styleUrls: ['./delete-channel.component.css']
})
export class DeleteChannelComponent {
  loading: boolean = false;
  readonly userKeySeparators = [ENTER, COMMA];

  constructor(private dialogRef: MatDialogRef<DeleteChannelComponent>, private snackBar: MatSnackBar) { }
  deleteChannel() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.dialogRef.close();
      let snackBarRef = this.snackBar.open('Channel Deleted', '', {
        duration: 3000
      })
      snackBarRef.onAction().subscribe(() => {
      })
    }, 3000)
  }


}
