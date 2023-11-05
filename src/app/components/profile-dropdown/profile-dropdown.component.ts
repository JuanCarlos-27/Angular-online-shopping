import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-dropdown.component.html',
})
export class ProfileDropdownComponent {

  private authService = inject(AuthService);

  public user = this.authService.currentUser;
  public hiddeMenu = signal<boolean>(true);

  toggleMenu() {
    this.hiddeMenu.update((value) => !value);
  }

  async logOut() {
    this.authService.logOut();
  }
}
