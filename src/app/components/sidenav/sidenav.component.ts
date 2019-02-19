import { Component, Input, OnInit } from '@angular/core';
import { ScreenSize } from 'src/app/services/screen-size.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Input() screen: ScreenSize;

  constructor() { 
    
  }

  ngOnInit() {
    console.log('onInit sidenav', this.screen);
  }
}
