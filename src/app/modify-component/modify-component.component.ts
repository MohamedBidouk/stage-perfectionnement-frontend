import {Component, OnInit} from '@angular/core';
import {Product} from "../model/product.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../service/product.service";

@Component({
  selector: 'app-modify-component',
  templateUrl: './modify-component.component.html',
  styleUrls: ['./modify-component.component.css']
})
export class ModifyComponentComponent implements OnInit{
  product= new Product();
  productId!: number;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';
  modifiedProduct!: Product;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private productService: ProductService) {
  }
  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params["productId"];console.log(this.productId);
    this.consultProduct(this.productId)
  }
  consultProduct(productId: number){
    this.productService.consultProduct(productId).subscribe(product =>{
      this.product= product;
    })
  }
  updateProduct(product: Product, productId: number){
    this.productService.updateProduct(product, productId).subscribe(product=>{
      console.log(product);
    })
  }

}
