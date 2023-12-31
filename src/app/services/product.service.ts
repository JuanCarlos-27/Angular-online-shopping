import { Injectable, inject, signal } from '@angular/core';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
import { Product } from '../models/product.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private firestore = inject(Firestore);
  private collection = collection(this.firestore, 'products');
  private _products = signal<Product[]>([]);

  get products() {
    return this._products();
  }

  async getProductsByQuery(term: string) {
    const response = await getDocs(this.collection)

    const filtered = response.docs.filter(doc => {
      const { title, category } = doc.data();
      return title.toLowerCase().includes(term.toLowerCase()) || category.toLowerCase().includes(term.toLowerCase())
    })

    const products = filtered.map(doc => doc.data()) as Product[];

    this._products.set(products);
    return products;
  }

  async getProductById(id: number) {
    const q = query(this.collection, where('id', '==', id));
    const response = await getDocs(q);
    return response.docs[0].data() as Product;
  }

}
