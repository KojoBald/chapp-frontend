import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { User } from '../../../models/User';

/**
 * @title Stepper overview
 */
@Component({
  selector: 'app-stepper', 
  templateUrl: 'stepper.component.html',
  styleUrls: ['stepper.component.css'],
})
export class Stepper implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  FormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;

  constructor(public _formBuilder: FormBuilder, public ApiService: ApiService) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.FormGroup = this._formBuilder.group({
      Ctrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
    this.fifthFormGroup = this._formBuilder.group({
      fifthCtrl: ['', Validators.required]
    });
  }

  signUp(first, last, username, email, password, confirmPassword) : void
  {
    event.preventDefault(); 
    if(password != confirmPassword){
      alert("your passwords do not match");
      return
    }
    let user: User = 
    {
      first: first,
      last: last,
      username: username,
      email: email,
      password: password
    }
    this.ApiService.signUp(user)
      .subscribe(({ user, token }) => {
        
      });
  }
}