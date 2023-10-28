import { ComponentFixture, TestBed } from '@angular/core/testing';

import SearchResultsComponent from './search-results.component';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Firestore } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';

import { importProvidersFrom } from '@angular/core';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment.development';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;
  let router: Router;
  let productService: ProductService;
  let firestore: Firestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SearchResultsComponent,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        importProvidersFrom([
          provideFirebaseApp(() => initializeApp(environment.firebase)),
          provideFirestore(() => getFirestore())
        ]),
      ]
    });
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    productService = TestBed.inject(ProductService);
    firestore = TestBed.inject(Firestore);

    //Select the input element into a different component
    const inputElement = fixture.debugElement.nativeElement.querySelector('input');
    console.log(inputElement);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render product cards with the info', () => {
    // const product = {
    //   id: 1,
    //   title: 'Product 1',
    //   price: 100,
    //   description: 'Product 1 description',
    //   image: 'https://via.placeholder.com/200x100'
    // };
    // const productElement = fixture.debugElement.nativeElement.querySelector('.product-detail');
    // expect(productElement).toBeTruthy();
    // expect(productElement.querySelector('.product-detail__title').textContent).toContain(product.title);
    // expect(productElement.querySelector('.product-detail__description').textContent).toContain(product.description);
    // expect(productElement.querySelector('.product-detail__price').textContent).toContain(product.price);
    // expect(productElement.querySelector('.product-detail__image').getAttribute('src')).toContain(product.image);
  })
});
