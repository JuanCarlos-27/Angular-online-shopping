import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['../auth.css']
})
export default class SignUpComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  public loading = signal<boolean>(false);

  public form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
  });

  async onSubmit(): Promise<void> {
    if (this.form.get('password')?.value !== this.form.get('confirmPassword')?.value) {
      return;
    }
    if (this.form.invalid) {
      return;
    }

    const { name, email, password } = this.form.value;
    this.loading.set(true);
    await this.authService.registerWithEmail({ name, email, password });
    this.loading.set(false);
    this.resetForm();
  }

  resetForm(): void {
    this.form.reset();
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

}
