import { ComponentFixture, TestBed } from '@angular/core/testing';

import HomeComponent from './home.component';

import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        RouterTestingModule.withRoutes([])
      ]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should redirect to /items?search= when search is called', async () => {
    const search = 'phones';
    const routerSpy = spyOn(router, 'navigate');

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.value = search;
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    const formElement = fixture.debugElement.query(By.css('form')).nativeElement;
    formElement.dispatchEvent(new Event('submit'));

    expect(routerSpy).toHaveBeenCalledWith(['/items'], { queryParams: { search } });
  });

  it('should not redirect when input is empty', async () => {
    const routerSpy = spyOn(router, 'navigate');

    const formElement = fixture.debugElement.query(By.css('form')).nativeElement;
    formElement.dispatchEvent(new Event('submit'));

    expect(routerSpy).not.toHaveBeenCalled();
  });
});
