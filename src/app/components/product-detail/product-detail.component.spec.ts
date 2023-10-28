import { ComponentFixture, TestBed } from '@angular/core/testing';

import ProductDetailComponent from './product-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Firestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment.development';

import { importProvidersFrom } from '@angular/core';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let router: Router;
  let productService: ProductService;
  let firestore: Firestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ProductDetailComponent,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        importProvidersFrom([
          provideFirebaseApp(() => initializeApp(environment.firebase)),
          provideFirestore(() => getFirestore())
        ]),
      ]
    });
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    productService = TestBed.inject(ProductService);
    firestore = TestBed.inject(Firestore);


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
