import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { RecipesPageComponent } from './components/recipes-page/recipes-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';

export const routes: Routes = [ 
    { path: 'login', component: LoginPageComponent},
    { path: 'home', component: HomeComponent },
    { path: 'products', component: ProductsPageComponent },
    { path: 'recipes', component: RecipesPageComponent },
    { path: 'profile', component: ProfilePageComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
