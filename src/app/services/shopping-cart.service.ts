import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { Product } from '../models/product.interface';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor() {
    effect(() => {
      if (this._productsInCart()) this.saveLocalStorage();
    })

    this.loadLocalStorage();
  }

  private toastr = inject(ToastrService)
  private _productsInCart = signal<Product[]>([]);

  public totalProductsInCart = computed(() => {
    return this._productsInCart().length
  });

  public totalPayment = computed(() => {
    return this._productsInCart().reduce((acc, prod) => acc + prod.price! * prod.quantity!, 0);
  });

  get productsInCart() {
    return this._productsInCart;
  }

  addProductToCart(product: Product, quantity: number) {
    const productExist = this._productsInCart().find(({ id }) => id === product.id);

    if (productExist && productExist.stock! < productExist.quantity! + quantity) {
      this.toastr.error('No hay suficiente stock');
      return;
    }

    if (productExist) {
      this._productsInCart.update(products => (
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

  deleteProductFormCart(id: number) {
    this._productsInCart.update(products => products.filter(prod => prod.id !== id));
  }

  saveLocalStorage() {
    localStorage.setItem('shoppingCart', JSON.stringify(this._productsInCart()));
  }

  loadLocalStorage() {
    const productsInCart = JSON.parse(String(localStorage.getItem('shoppingCart')))
    if (productsInCart) {
      this._productsInCart.set(productsInCart);
    }
  }
}
