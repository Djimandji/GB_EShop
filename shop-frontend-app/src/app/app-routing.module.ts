import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductGalleryPageComponent} from "./page/product-gallery-page/product-gallery-page.component";
import {ProductInfoPageComponent} from "./page/product-info-page/product-info-page.component";
import {CartPageComponent} from "./page/cart-page/cart-page.component";
import {OrderPageComponent} from "./page/order-page/order-page.component";
import {LoginPageComponent} from "./page/login-page/login-page.component";
import {AuthGuard} from "./helper/auth-guard";

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "product"},
  {path: "product", component: ProductGalleryPageComponent},
  {path: "product/:id", component: ProductInfoPageComponent},
  {path: "cart", component: CartPageComponent},
  {path: "login", component: LoginPageComponent},
  {path: "order", component: OrderPageComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
