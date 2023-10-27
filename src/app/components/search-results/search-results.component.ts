import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
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
    const categories: { [key: string]: number } = {};
    const products = this.products();
    for(const product of products) {
      categories[product.category] =  categories[product.category] ? categories[product.category] + 1 : 1;
    }
    return categories
  });

  public isLoading: boolean = true;

  async getResults() {
    try {
      const result = await this.productService.getProductsByQuery(this.term);
      this.products.set(result);
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }

  // async addNewProduct() {
  //   const productRef = collection(this.firestore, 'products');

  //   for(const product of DATA) {
  //     await addDoc(productRef, product);
  //   }

  //   // addDoc(collection(this.firestore, 'products'), {
  //   //   title: 'New Product',
  //   //   price: 100,
  //   //   stock: 10,
  //   //   description: 'This is a new product',
  //   //   images: ['https://i.dummyjson.com/data/products/30/1.jpg'],
  //   //   thumbnail: 'https://i.dummyjson.com/data/products/30/1.jpg',
  //   //   category: 'home-decoration',
  //   //   brand: 'Golden',
  //   //   discountPercentage: 2.92,
  //   //   rating: 4.92,
  //   // }).then((res) => {
  //   //   console.log('Document written with ID: ', res);
  //   // });
  // }



}
