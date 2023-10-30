import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './shopping-cart.component.html'
})
export default class ShoppingCartComponent {

  private shoppingCartService = inject(ShoppingCartService);
  public totalProductsInCart = this.shoppingCartService.totalProductsInCart;

}
