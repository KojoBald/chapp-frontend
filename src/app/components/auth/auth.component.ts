import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private ApiService: ApiService, private router: Router) {}
  

  ngOnInit()
  {
    sessionStorage.setItem("token", '')
    sessionStorage.setItem("userId", '')
  }

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
    .subscribe(newUser => {console.log("here", newUser)
    sessionStorage.setItem('token', newUser.token)
<<<<<<< HEAD
    sessionStorage.setItem("userId", newUser.user.id);
    this.routeToHome()
    alert('user created')})
=======
    this.routeToHome()
    })
>>>>>>> 4502dfffae63ca68f94e36d25f4e7956ae96f861
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
    .subscribe(data => {console.log(data)
    sessionStorage.setItem('token', data.token)
    sessionStorage.setItem("userId", data.user.id);
    this.routeToHome()
    })
  }

  routeToHome()
  {
    if(sessionStorage.getItem('token') !== "")
    {
      this.router.navigate([''])
    }
  }

}
