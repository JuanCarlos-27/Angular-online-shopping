import { Injectable, inject, signal, effect } from '@angular/core';
import {
  Auth,
  User,
  authState,
  signInWithEmailAndPassword,
  updateProfile,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  AuthErrorCodes,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterData } from '../models/register.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private router = inject(Router);
  private _currentUser = signal<User | null>(null);
  private toastr = inject(ToastrService)


  constructor() {
    const user = JSON.parse(String(localStorage.getItem('user')));
    if (user) this._currentUser.set(user);

    authState(this.auth).subscribe((user: User | null) => {
      localStorage.setItem('user', JSON.stringify(user));
      this._currentUser.set(user);
    });
  }

  get currentUser() {
    return this._currentUser;
  }

  async loginWithGoogle() {
    try {
      const userCredential = await signInWithPopup(this.auth, new GoogleAuthProvider());
      console.log("User credential", userCredential)
      this.router.navigate(['/items'])
    } catch (error: any) {
      console.error("Error iniciando sesión", error);
      if (error.code === AuthErrorCodes.USER_DISABLED) {
        this.toastr.error('El usuario se encuentra inhabilitado, comuniquese con el administrador');
      }

    }
  }

  async loginWithEmail(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      if (!userCredential.user.emailVerified) {
        this.toastr.error('Debes verificar tu correo electrónico');
        await signOut(this.auth);
        return;
      }
      this.router.navigate(['/items'])
    } catch (error: any) {
      console.error("Error iniciando sesión", error);
      if (error.code === 'auth/invalid-login-credentials') {
        this.toastr.error('Credenciales incorrectas');
      }
      if (error.code === AuthErrorCodes.USER_DISABLED) {
        this.toastr.error('El usuario se encuentra deshabilitado, comuquese con el administrador');
      }

    }
  }

  async registerWithEmail(registerData: RegisterData) {
    const { email, password, name } = registerData;
    try {
      const userCrendential = await createUserWithEmailAndPassword(this.auth, email, password);
      await sendEmailVerification(userCrendential.user);
      await updateProfile(userCrendential.user, {
        displayName: name,
        photoURL: this.generateProfileImage(name),
      });
      await signOut(this.auth);
      this.router.navigate(['/auth/login']);
      this.toastr.success('Hemos enviado un correo de verificación a tu correo electrónico');

    } catch (error: any) {
      if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
        this.toastr.error('El correo ya està registrado, iniciá sesión');
      }
    }
  }

  generateProfileImage(name: string): string {
    const BASE_URL = 'https://ui-avatars.com/api/';
    const image = `${BASE_URL}?name=${name}`;
    return image;
  }

  register(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        sendEmailVerification(userCredential.user).then(() => {
          updateProfile(userCredential.user, {
            displayName: 'John Doe',
            photoURL: 'https://example.com/jane-q-user/profile.jpg',

          }).then(() => {
            console.log('User created!');
          })
        })
      })
  }

  async logOut() {
    try {
      await signOut(this.auth);
      this.router.navigate(['/auth/login']);
    } catch (error) {
      console.error("Error cerrando la sesión del usuario", error);
    }
  }
}

