import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-button',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart-button.component.html',
})
export class CartButtonComponent {
  private shoppingCartService = inject(ShoppingCartService);
  public totalProductsInCart = this.shoppingCartService.totalProductsInCart;
}
