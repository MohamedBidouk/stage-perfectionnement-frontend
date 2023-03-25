import {Component, Inject, Input, OnInit} from '@angular/core';
import {ProductService} from "../service/product.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {Product} from "../model/product.model";
import {Router} from "@angular/router";
import {CategoryService} from "../service/category.service";
import {Category} from "../model/category.model";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DialogConfirmComponent} from "../dialog-confirm/dialog-confirm.component";
import {DOCUMENT} from "@angular/common";



@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{
  @Input()
  product = new Product();
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';
  id!: number | undefined;
  idCategoryToAdd!: number;
  allCategories!: Category[];
  public files: any[] = [];

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog,
              @Inject(DOCUMENT) document: Document) {
  }
  ngOnInit(): void {
    this.getAllCategories();
  }
  upload(idProduct: number): void {
    this.progress = 0;
    this.preview = '';

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.productService.upload(this.currentFile, idProduct).subscribe({
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
  createProduct(newProduct: Product){
    let form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (!form.checkValidity()) {
      event!.preventDefault();
      event!.stopPropagation();
    }else {


      this.categoryService.getCategory(this.idCategoryToAdd).subscribe((cat)=>{
        newProduct.category = cat;
      });
      this.productService.addProducts(newProduct).subscribe({next:(value:Product)=>{
          this.id = value.id;console.log(this.id);
          this.upload(value.id!);
        }});
    }
    form.classList.add('was-validated');
  }
  getAllCategories(){
    this.categoryService.getAllCategories().subscribe((categories)=>{
      this.allCategories= categories;console.log(this.allCategories);
    });
  }
  onFileChange(evt: any){
    this.files = Object.keys(evt.target.files).map(key => evt.target.files[+key]);
    this._snackBar.open("Successfully upload!", 'Close', {
      duration: 2000,
    });
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = evt.target.files;

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
  deleteFile(f: any){
    this.selectedFiles = undefined;
    this.files = this.files.filter(function(w){ return w.name != f.name });
    this._snackBar.open("Successfully delete!", 'Close', {
      duration: 2000,
    });
  }
  openConfirmDialog(pIndex: any): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      panelClass: 'modal-xs'
    });
    dialogRef.componentInstance.fName = this.files[pIndex].name;
    dialogRef.componentInstance.fIndex = pIndex;


    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.deleteFromArray(result);
      }
    });
  }

  deleteFromArray(index: any) {
    console.log(this.files);
    console.log(this.selectedFiles);
    this.files.splice(index, 1);
  }
  clickSelector(){
    document.getElementById('file')!.click()
  }
}
