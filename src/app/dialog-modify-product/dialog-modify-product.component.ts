import {Component, Inject, OnInit} from '@angular/core';
import {CategoryService} from "../service/category.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogModifyCategoryComponent} from "../dialog-modify-category/dialog-modify-category.component";
import {ProductService} from "../service/product.service";
import {Category} from "../model/category.model";

@Component({
  selector: 'app-dialog-modify-product',
  templateUrl: './dialog-modify-product.component.html',
  styleUrls: ['./dialog-modify-product.component.css']
})
export class DialogModifyProductComponent implements OnInit{
  productCat!: Category;
  idCat!: number;

  constructor(
    private productService: ProductService,
    public dialogRef: MatDialogRef<DialogModifyProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  getCategory(productId: number): Category{
    let cat = new Category();
    this.productService.getCategory(productId).subscribe((category)=>{
      cat = category;
      this.productCat = cat;
    });
    return cat;
  }
  onOkClick(){
    this.productService.updateProduct(this.data.product, this.data.product.id).subscribe((prod)=>{
      console.log(prod);
    })
  }

  ngOnInit(): void {
    this.getCategory(this.data.product.id);
  }
  categoryChanged(categoryId: number){
    this.productService.setCategory(this.data.product.id, categoryId).subscribe();
  }
}
