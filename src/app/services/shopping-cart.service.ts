import { Injectable, inject, signal, computed } from '@angular/core';
import { Product } from '../models/product.interface';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private toastr = inject(ToastrService)

  private productsInCart = signal<Product[]>([]);

  public totalProductsInCart = computed(() => {
    return this.productsInCart().length
  });

  addProductToCart(product: Product, quantity: number) {
    const productExist = this.productsInCart().find(({ id }) => id === product.id);

    if (productExist && productExist.stock! < productExist.quantity! + quantity) {
      this.toastr.error('No hay suficiente stock');
      return;
    }

    if (productExist) {
      this.productsInCart.update(products => (
        products.map(prod => {
          return prod.id === product.id
            ? { ...prod, quantity: prod.quantity! + quantity }
            : prod
        })
      ));
    } else {
      this.productsInCart.update(products => [...products, { ...product, quantity }]);
    }

    this.toastr.success(`${product.title} añadido al carrito!`);
  }
}
