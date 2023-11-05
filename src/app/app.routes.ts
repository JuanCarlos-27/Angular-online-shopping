import { Routes } from '@angular/router';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth/login']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['items']);

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/home/home.component'),
        ...canActivate(redirectLoggedInToItems)
    },
    {
        path: 'auth',
        loadChildren: () => import('./components/authentication/auth.routes').then(m => m.AUTH_ROUTES),
        ...canActivate(redirectLoggedInToItems)
    },
    {
        path: 'items',
        loadComponent: () => import('./components/layout/layout.component'),
        children: [
            { path: '', loadComponent: () => import('./components/search-results/search-results.component') },
            { path: ':id', loadComponent: () => import('./components/product-detail/product-detail.component') }
        ]
    },
    {
        path: 'shopping-cart',
        loadComponent: () => import('./components/layout/layout.component'),
        children: [
            { path: '', loadComponent: () => import('./components/shopping-cart/shopping-cart.component') }
        ]
    },
    {
        path: 'payment',
        loadComponent: () => import('./components/layout/layout.component'),
        children: [
            { path: '', loadComponent: () => import('./components/payment/payment.component') }
        ],
        ...canActivate(redirectUnauthorizedToLogin)
    },
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '**', redirectTo: '' }
];
