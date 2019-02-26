import { Component } from '@angular/core';
import { MatDialogRef, MatChipInputEvent, MatSnackBar } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { ApiService } from '../../../services/api.service';
import { UserUpdate } from '../../../models/userUpdate';


@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent {
  loading: boolean = false;
  readonly userKeySeparators = [ENTER, COMMA];
  name: string = '';
  users: any[] = [];
  private id = sessionStorage.getItem("userId");

  constructor(private dialogRef: MatDialogRef<UpdateProfileComponent>, private snackBar: MatSnackBar, private ApiService: ApiService) { }

  updateUser(username, photo) 
  {
    this.loading = true;
    setTimeout(() => 
    {
      this.loading = false;
      this.dialogRef.close();
      let snackBarRef = this.snackBar.open('User Updated', '', 
      {
        duration: 3000
      })
      snackBarRef.onAction().subscribe(() => 
      {})
    }, 3000)

    sessionStorage.getItem(this.id)
    let userUpdate: UserUpdate = 
    {
      username: username,
      image: photo
    }
    this.ApiService.updateUser(userUpdate, this.id)
    .subscribe(user => console.log(user))
  }

}
