import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { CartComponent } from './components/cart/cart.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductsComponent } from './components/products/products.component';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:'full',},
  {path:'login', component: AuthComponent,},
  {path:'products', component: ProductsComponent,canActivate: [AuthGuard]},
  {path:'cart', component: CartComponent,canActivate: [AuthGuard]},
  {path:'nav', component: NavbarComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
