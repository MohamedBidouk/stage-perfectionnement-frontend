import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BindingComponent } from './binding/binding.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import {RouterOutlet} from "@angular/router";
import {ProductsComponent} from "./products/products.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { DetailledProductComponent } from './detailled-product/detailled-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatIconModule} from "@angular/material/icon";
import { ModifyComponentComponent } from './modify-component/modify-component.component';
import {TokenInterceptor} from "./service/token.interceptor";
import {LoginComponent} from "./login/login.component";
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './add-user/add-user.component';



@NgModule({
  declarations: [
    AppComponent,
    BindingComponent,
    ProductsComponent,
    DetailledProductComponent,
    AddProductComponent,
    ModifyComponentComponent,
    LoginComponent,
    UserComponent,
    AddUserComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        RouterOutlet,
        HttpClientModule,
        BrowserAnimationsModule,
        MatSlideToggleModule,
        MatIconModule,
        ReactiveFormsModule
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
