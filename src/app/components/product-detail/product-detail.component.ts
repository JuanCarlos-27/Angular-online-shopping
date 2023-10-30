import { Component, inject, signal, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.interface';
import { StarsComponent } from '../stars/stars.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, StarsComponent, ReactiveFormsModule],
  templateUrl: './product-detail.component.html',
})
export default class ProductDetailComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private shoppingCartService = inject(ShoppingCartService);

  constructor() {
    this.route.params.subscribe(params => {
      const { id } = params;
      if (!id) return;
      this.getProduct(Number(id));
    });
  }
  public product = signal<Product | null>(null);
  public isLoading: boolean = true;
  public quantity: FormControl = new FormControl(1, [Validators.required, Validators.min(1)]);

  ngOnInit(): void {
    this.quantity.valueChanges.subscribe(value => {
      if (value < 0) this.quantity.setValue(1);
      if (value > this.product()?.stock!) this.quantity.setValue(this.product()?.stock);
    });
  }

  goBack() {
    window.history.back();
  }

  async getProduct(id: number) {
    try {
      const response = await this.productService.getProductById(id);
      this.product.set(response);
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }

  addToCart($event: Event) {
    if (this.quantity.invalid || this.quantity.value === 0) return;
    if (!this.product()) return;

    if ($event.target instanceof HTMLButtonElement) {
      this.shoppingCartService.addProductToCart(this.product()!, this.quantity.value);
    }
  }


}
