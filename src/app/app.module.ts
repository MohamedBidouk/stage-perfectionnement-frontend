import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BindingComponent } from './binding/binding.component';
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import {RouterOutlet} from "@angular/router";
import {ProductsComponent} from "./products/products.component";
import {HttpClientModule} from "@angular/common/http";
import { DetailledProductComponent } from './detailled-product/detailled-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatIconModule} from "@angular/material/icon";
import { ModifyComponentComponent } from './modify-component/modify-component.component';



@NgModule({
  declarations: [
    AppComponent,
    BindingComponent,
    ProductsComponent,
    DetailledProductComponent,
    AddProductComponent,
    ModifyComponentComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        RouterOutlet,
        HttpClientModule,
        BrowserAnimationsModule,
        MatSlideToggleModule,
        MatIconModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
