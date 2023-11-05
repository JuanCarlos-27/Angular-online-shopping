import { Routes } from "@angular/router";
import LayoutComponent from "../layout/layout.component";

export const AUTH_ROUTES: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'login', loadComponent: () => import('./sign-in/sign-in.component') },
            { path: 'register', loadComponent: () => import('./sign-up/sign-up.component') },
            { path: '**', redirectTo: 'login' }
        ]
    }
]