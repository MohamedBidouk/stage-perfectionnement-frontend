import {Component, Inject} from '@angular/core';
import {CategoryService} from "../service/category.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogModifyCategoryComponent} from "../dialog-modify-category/dialog-modify-category.component";
import {ProductService} from "../service/product.service";

@Component({
  selector: 'app-dialog-modify-product',
  templateUrl: './dialog-modify-product.component.html',
  styleUrls: ['./dialog-modify-product.component.css']
})
export class DialogModifyProductComponent {

  constructor(
    private productService: ProductService,
    public dialogRef: MatDialogRef<DialogModifyProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  onOkClick(){
    this.productService.updateProduct(this.data.product, this.data.product.id).subscribe((prod)=>{
      console.log(prod);
    })
  }
}
