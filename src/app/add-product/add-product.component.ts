import {Component, Input} from '@angular/core';
import {ProductService} from "../service/product.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  @Input()
  product = new Product();
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';
  fileInfos?: Observable<any>;
  id!: number | undefined;

  constructor(private productService: ProductService,
              private router: Router) {
  }
  upload(): void {
    this.progress = 0;
    this.preview = '';

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.productService.upload(this.currentFile, this.id!).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              //this.fileInfos = this.productService.getPhotos(this.id!);
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
  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.preview = '';
        this.currentFile = file;

        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.preview = e.target.result;
        };

        reader.readAsDataURL(this.currentFile);
      }
    }
  }
  createProduct(newProduct: Product){
    this.productService.addProducts(newProduct).subscribe({next:(value:Product)=>{
      this.id = value.id;console.log(this.id);
    }});
  }
  uploadButton(){
    const i = document.getElementById('fileInput') as HTMLInputElement;
      i.click();
  }
}
