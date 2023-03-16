import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material/dialog";
import {Category} from "../model/category.model";
import {Product} from "../model/product.model";
import {CategoryService} from "../service/category.service";

@Component({
  selector: 'app-dialog-modify-category',
  templateUrl: './dialog-modify-category.component.html',
  styleUrls: ['./dialog-modify-category.component.css']
})
export class DialogModifyCategoryComponent {

  constructor(
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<DialogModifyCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  onOkClick(){
    this.categoryService.updateCategory(this.data.category.id, this.data.category).subscribe((cat)=>{
      console.log(cat);
    })
  }

}
