import {Component, OnInit} from '@angular/core';
import {Product} from "../model/product.model";
import {ProductService} from "../service/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Fproduct} from "../model/fproduct.model";

@Component({
  selector: 'app-detailled-product',
  templateUrl: './detailled-product.component.html',
  styleUrls: ['./detailled-product.component.css']
})
export class DetailledProductComponent implements OnInit{
  product!: Fproduct;
  productId!: number;
  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params["productId"];
    this.consultProduct(this.productId);
  }

  consultProduct(productId: number){
    this.productService.consultProduct(productId).subscribe(product =>{
      this.product = product;console.log(product);console.log(this.product);
    })
  }
}
