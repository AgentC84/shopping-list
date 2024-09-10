import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  errorMessage: string | null = null;

  formRegister = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmitRegister(): void {
    const formData = this.formRegister.getRawValue();
    this.authService.register(formData.email, formData.username, formData.password).subscribe({
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
