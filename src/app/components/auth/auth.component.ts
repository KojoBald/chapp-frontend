import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/User';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent 
{
  whichForm: string = 'toggle'; 

  constructor(public ApiService: ApiService, public router: Router) {}
  

  ngOnInit()
  {sessionStorage.setItem("token", '')}

  signUp(first, last, username, email, password, confirmPassword) : void
  {
    event.preventDefault(); 
    if(password != confirmPassword)
    {
      alert("your passwords do not match");
      return
    }
    this.ApiService.signUp({ first, last, username, email, password })
      .subscribe(() => this.routeToHome())
  }

  login(emails, passwords)
  {
    event.preventDefault();
    let login: User =
    {
      email: emails,
      password: passwords
    }
    this.ApiService.login(login)
      .subscribe(() => this.routeToHome())
  }

  routeToHome()
  {
    if(sessionStorage.getItem('token') !== "")
    {
      this.router.navigate([''])
    }
  }

}
