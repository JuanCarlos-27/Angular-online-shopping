import { Component, inject,ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SearchInputComponent } from '../search-input/search-input.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, SearchInputComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  @ViewChild(SearchInputComponent) searchInput!: SearchInputComponent;
  private router = inject(Router);

  onSearch(event: Event): void {
    event.preventDefault();

    const { value } = this.searchInput.searchInput.nativeElement;

    if(!value || !value.trim()) return

    this.router.navigate(['/items'], { queryParams: { search: value }})
  }

}
