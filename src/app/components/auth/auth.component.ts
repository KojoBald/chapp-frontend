import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/user';
import { UserLogin} from '../../models/UserLogin';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent 
{
  whichForm: string = 'toggle'; 

  constructor(private ApiService: ApiService) {}
  

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
    let user: User = 
    {
      first: first,
      last: last,
      username: username,
      email: email,
      password: password
    }
    this.ApiService.signUp(user)
    .subscribe(newUser => {console.log(newUser)
    sessionStorage.setItem('token', newUser.token)
    })
  }

  login(emails, passwords)
  {
    event.preventDefault();
    let login: UserLogin =
    {
      email: emails,
      password: passwords
    }
    this.ApiService.login(login)
    .subscribe(data => console.log(data))
  }
}
