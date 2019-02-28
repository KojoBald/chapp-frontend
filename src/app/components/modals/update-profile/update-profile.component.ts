import { Component } from '@angular/core';
import { MatDialogRef, MatChipInputEvent, MatSnackBar } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent {
  loading: boolean = false;
  readonly userKeySeparators = [ENTER, COMMA];
  name: string = '';
  photo: string = '';
  users: any[] = [];

  constructor(public dialogRef: MatDialogRef<UpdateProfileComponent>, public snackBar: MatSnackBar) { }

  updateUser() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.dialogRef.close();
      let snackBarRef = this.snackBar.open('User Updated', '', {
        duration: 3000
      })
      snackBarRef.onAction().subscribe(() => {
      })
    }, 3000)
  }

}
