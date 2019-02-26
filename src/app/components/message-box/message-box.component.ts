import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditMessageComponent } from '../modals/edit-message/edit-message.component';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openEditMsg() {
    let dialogRef = this.dialog.open(EditMessageComponent, {
      width: '50vw'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('closed', result);
    })
  }

}
