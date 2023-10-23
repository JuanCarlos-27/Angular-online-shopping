import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/home/home.component')
    },
    {
        path: 'items',
        loadComponent: () => import('./components/layout/layout.component'),
        children: [
            { path: '', loadComponent: () => import('./components/search-results/search-results.component')},
            { path: ':id', loadComponent: () => import('./components/product-detail/product-detail.component')}
        ]
    },
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '**', redirectTo: '' }
];
