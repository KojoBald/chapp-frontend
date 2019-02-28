import { Component } from '@angular/core';
import { MatDialogRef, MatChipInputEvent, MatSnackBar } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent {
  name: string = '';
  users: any[] = [];
  loading: boolean = false;
  readonly userKeySeparators = [ENTER, COMMA];

  constructor(public dialogRef: MatDialogRef<ManageUsersComponent>, public snackBar: MatSnackBar) { }
    editUsers() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.dialogRef.close();
      let snackBarRef = this.snackBar.open('Users Updated', '', {
        duration: 3000
      })
      snackBarRef.onAction().subscribe(() => {
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

}