import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['../auth.css']
})
export default class SignInComponent {

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  public form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  onSubmitForm() {
    if (this.form.invalid) {
      return;
    }
    const { email, password } = this.form.value;
    this.authService.loginWithEmail(email, password);
  }
}
