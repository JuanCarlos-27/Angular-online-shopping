import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.interface';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.component.html'
})
export default class ProductDetailComponent {

  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  constructor() {
    this.route.params.subscribe(params => {
     const { id } = params;
     if(!id) return;

      this.getProduct(Number(id));
    });
  }

  public product = signal<Product | null>(null);
  public isLoading: boolean = true;

  goBack() {
    window.history.back();
  }

  async getProduct(id: number) {
    try {
      const response = await this.productService.getProductById(id);
      this.product.set(response);
      console.log(this.product()?.thumbnail)
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }
}
