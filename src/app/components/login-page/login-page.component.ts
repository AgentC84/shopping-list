import { Component } from '@angular/core';
import { LoginFormComponent } from '../layout/login-form/login-form.component';
import { RegisterFormComponent } from '../layout/register-form/register-form.component';

type AuthMode = 'Login' | 'Register';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginFormComponent, RegisterFormComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})


export class LoginPageComponent {
  authMode: AuthMode = 'Login';
  setAuthMode(mode: AuthMode) {
    this.authMode = mode;
  }
 
}
