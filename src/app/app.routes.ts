import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { NotFound } from './components/not-found/not-found';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { Cart } from './components/cart/cart';

export const routes: Routes = [
    {
        path:'home',
        component:Home  
    },
     {
        path:'register',
        component:Register
    },
    {
        path:'login',
        component:Login
    },
    {
        path:'cart',
        component:Cart
    },
    {
        path:'',
        redirectTo:'/home',
        pathMatch: 'full'
    },

    {
        path:'**',
        component:NotFound
    } 

];
