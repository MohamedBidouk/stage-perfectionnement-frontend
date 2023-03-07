import {Component, OnInit} from '@angular/core';
import {Product} from "../model/product.model";
import {ProductService} from "../service/product.service";
import {Observable} from "rxjs";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {Fproduct} from "../model/fproduct.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products!: Product[];
  id!: number;
  fileInfos?: Observable<any>;
  allProducts?: Fproduct[];
  selectedFiles?: FileList;
  currentFile?: File;

  progress = 0;
  message = '';
  constructor(private productService: ProductService,
              private router: Router) {
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  ngOnInit(): void {
    this.loadAllProducts();
  }

  loadAllProducts(){
    this.productService.getAllProducts().subscribe(allProducts=>{
      this.allProducts = allProducts;
    })
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.productService.upload(this.currentFile, this.id).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.productService.getPhotos(this.id);
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          }
        });
      }

      this.selectedFiles = undefined;
    }
  }
  deleteProduct(productId: number){
    this.productService.deleteProduct(productId).subscribe(() => {
      this.loadAllProducts();
    })
  }
  passToModifyPage(productId: number){
    this.router.navigate(['modify-product',productId]);
  }
  passToDetailPage(productId: number){
    this.router.navigate(['detail',productId]);
  }
}
