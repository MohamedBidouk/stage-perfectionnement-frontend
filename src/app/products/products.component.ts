import {Component, OnInit} from '@angular/core';
import {Product} from "../model/product.model";
import {ProductService} from "../service/product.service";
import {Observable} from "rxjs";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {Fproduct} from "../model/fproduct.model";
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ChoiceBoxModel} from "../model/ChoiceBox.model";

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
  form!: FormGroup;
  constructor(private productService: ProductService,
              private router: Router,
              public authService: AuthService,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      selected : this.formBuilder.array([],[Validators.required])
    })
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
  deleteSelectedProducts(){
    let i = 0;
    while (i<this.form.value.selected.length){
      this.deleteProduct(this.form.value.selected.at(i));
      i++;
    }
    this.loadAllProducts();
  }
  passToModifyPage(productId: number){
    this.router.navigate(['modify-product',productId]);
  }
  passToDetailPage(productId: number){
    this.router.navigate(['detail',productId]);
  }
  productSelected(e: any){
    const selected : FormArray = this.form.get('selected') as FormArray;
    if (e.target.checked) {
      selected.push(new FormControl(e.target.value));
    } else {
      const index = selected.controls.findIndex(x => x.value === e.target.value);
      selected.removeAt(index);
    }
  }

}
