import { Component } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-edit-message',
  templateUrl: './edit-message.component.html',
  styleUrls: ['./edit-message.component.css']
})
export class EditMessageComponent {

  loading: boolean = false;
  readonly userKeySeparators = [ENTER, COMMA];
  name: string = '';
  users: any[] = [];

  constructor(private dialogRef: MatDialogRef<EditMessageComponent>, private snackBar: MatSnackBar) { }

  updateChannel() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.dialogRef.close();
      let snackBarRef = this.snackBar.open('Message Edited', '', {
        duration: 3000
      })
      snackBarRef.onAction().subscribe(() => {
      })
    }, 3000)
  }

}
