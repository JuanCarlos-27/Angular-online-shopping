import { Component, ElementRef, ViewChild, inject, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'search-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-input.component.html',
  styles: [
  ]
})
export class SearchInputComponent implements AfterViewInit {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  private route = inject(ActivatedRoute);
  public term: string = '';

  constructor() {
    this.route.queryParams.subscribe(params => {
      const { search } = params;
      this.term = search ?? '';
    });
  }

  ngAfterViewInit(): void {
    this.searchInput.nativeElement.value = this.term;
  }
}
