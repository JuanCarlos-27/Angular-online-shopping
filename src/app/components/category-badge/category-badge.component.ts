import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule, KeyValue } from '@angular/common';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-badge.component.html'
})
export class CategoryBadgeComponent implements OnInit {

  @Input() item: KeyValue<string, number> = { key: '', value: 0 };
  @Input() products: Product[] = [];
  @Output() onEmitCategory: EventEmitter<Product[]> = new EventEmitter<Product[]>();

  private productService = inject(ProductService);

  ngOnInit(): void { }

  handleSelectBadge(): void {
    if (this.item.key === 'Todos') {
      this.onEmitCategory.emit(this.productService.products);
      return;
    }
    const newFilter = this.products.filter(product => product.category === this.item.key);
    this.onEmitCategory.emit(newFilter);
  }
}
