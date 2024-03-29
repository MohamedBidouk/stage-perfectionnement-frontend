import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ProductsComponent} from "./products/products.component";
import {AddProductComponent} from "./add-product/add-product.component";
import {DetailledProductComponent} from "./detailled-product/detailled-product.component";
import {BrowserModule} from "@angular/platform-browser";
import * as path from "path";
import {ModifyComponentComponent} from "./modify-component/modify-component.component";
import {LoginComponent} from "./login/login.component";
import {UserComponent} from "./user/user.component";
import {AddUserComponent} from "./add-user/add-user.component";
import {CategoryComponent} from "./category/category.component";


const routes: Routes= [
  {path: "products", component: ProductsComponent},
  {path: "", redirectTo: "products", pathMatch:"full"},
  {path: "add-product", component: AddProductComponent},
  {path: "detail/:productId", component: DetailledProductComponent},
  {path: "modify-product/:productId", component: ModifyComponentComponent},
  {path: "login", component: LoginComponent},
  {path: "users", component: UserComponent},
  {path: "add-user", component: AddUserComponent},
  {path: "category", component: CategoryComponent}

];
@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
