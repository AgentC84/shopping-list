import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  errorMessage: string | null = null;

  formLogin = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmitLogin():void {
    this.errorMessage = '';
    const rawForm = this.formLogin.getRawValue();
    this.authService.login(rawForm.email, rawForm.password).subscribe({
      next: () => {
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        switch(err.code) {
          case 'auth/missing-email':
            this.errorMessage = 'Введите почту';
            break;
          case 'auth/missing-password':
            this.errorMessage = 'Введите пароль';
            break;

          case 'auth/invalid-credential':
            this.errorMessage = 'Неверый пароль или почта';
            break;
        }
      }
    })
  }
}

