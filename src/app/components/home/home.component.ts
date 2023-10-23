import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { SearchInputComponent } from '../search-input/search-input.component';

@Component({
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    SearchInputComponent
  ],
  templateUrl: './home.component.html',
})
export default class HomeComponent {

  constructor() {
    this.appService.changeTitle('Home');
  }

  private router = inject(Router);
  private appService = inject(AppService)

  @ViewChild(SearchInputComponent) searchInput!: SearchInputComponent;

  onSearch(event: Event) {
    event.preventDefault();

    const term = this.searchInput.searchInput.nativeElement.value;
    if(!term || !term.trim()) return

    this.router.navigate(['/items'], { queryParams: { search: term }})
  }
}
