import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';
import { StarsComponent } from '../stars/stars.component';
import { CategoryBadgeComponent } from '../category-badge/category-badge.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, StarsComponent, CategoryBadgeComponent],
  templateUrl: './search-results.component.html',
})
export default class SearchResultsComponent {
  private route = inject(ActivatedRoute);
  private appService = inject(AppService);
  private productService = inject(ProductService);

  public term: string = '';

  constructor() {
    this.route.queryParams.subscribe(params => {
      const { search } = params;
      this.term = search ?? '';
      this.getResults();
    })

    this.appService.changeTitle('Search');
  }

  public products = signal<Product[]>([]);

  public categories = computed(() => {
    const categories: { [key: string]: number } = { "Todos": this.productService.products.length };
    const products = this.products();
    for (const product of products) {
      categories[product.category] = categories[product.category] ? categories[product.category] + 1 : 1;
    }
    return categories
  });

  public isLoading: boolean = true;

  async getResults() {
    try {
      const result = await this.productService.getProductsByQuery(this.term);
      this.products.set(result);
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  onSelectCategory(products: Product[]) {
    this.products.set(products);
  }
}
