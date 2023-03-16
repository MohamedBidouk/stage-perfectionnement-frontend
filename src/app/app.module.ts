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
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";
import { CategoryComponent } from './category/category.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { DialogModifyCategoryComponent } from './dialog-modify-category/dialog-modify-category.component';
import {MatDialogModule} from "@angular/material/dialog";
import { DialogModifyProductComponent } from './dialog-modify-product/dialog-modify-product.component';
import {MatTooltipModule} from "@angular/material/tooltip";



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
    AddUserComponent,
    CategoryComponent,
    DialogModifyCategoryComponent,
    DialogModifyProductComponent
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
        ReactiveFormsModule,
        MatTableModule,
        MatCheckboxModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatListModule,
        MatInputModule,
        MatExpansionModule,
        MatDialogModule,
        MatTooltipModule
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
