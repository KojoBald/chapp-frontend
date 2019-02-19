import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent 
{
  whichForm: string = 'toggle'; 

  constructor(private ApiService: ApiService) {} 

<<<<<<< HEAD:src/app/auth/auth.component.ts
}
=======
  signUp(user) : void
  {
    event.preventDefault();
    this.ApiService.signUp(user)
    .subscribe(newUser => newUser);
  }
}
>>>>>>> develop:src/app/components/auth/auth.component.ts
