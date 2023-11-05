import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './shopping-cart.component.html'
})
export default class ShoppingCartComponent {

  private shoppingCartService = inject(ShoppingCartService);
  private router = inject(Router);
  private authService = inject(AuthService);

  public user = this.authService.currentUser;
  public productsInCart = this.shoppingCartService.productsInCart;
  public totalProductsInCart = this.shoppingCartService.totalProductsInCart;
  public totalPayment = this.shoppingCartService.totalPayment;

  redirectToProductDetail(id: number, event: Event) {
    if (event.target instanceof HTMLButtonElement) return;
    this.router.navigate(['/items', id])
  }

  deleteProductFormCart(id: number) {
    this.shoppingCartService.deleteProductFormCart(id);
  }

  goBack() {
    this.router.navigate(['/items'], { queryParams: { search: '' } })
  }

  handlePayment() {
    if (!this.user()) {
      this.router.navigate(['auth/login']);
      return;
    }

    this.router.navigate(['/payment']);
  }


}
