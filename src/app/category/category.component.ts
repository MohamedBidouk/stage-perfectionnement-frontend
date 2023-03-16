import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from "../service/category.service";
import {Category} from "../model/category.model";
import {AuthService} from "../service/auth.service";
import {SelectionModel} from "@angular/cdk/collections";
import {Fproduct} from "../model/fproduct.model";
import {MatDialog} from "@angular/material/dialog";
import {DialogModifyCategoryComponent} from "../dialog-modify-category/dialog-modify-category.component";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
  @Input()
  category = new Category();
  allCategories!: Category[];
  panelOpenState = false;
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<Category>(this.allowMultiSelect, this.initialSelection);
  description!: string;
  name!: string;
  categoryData!: Category;
  constructor(private categoryService: CategoryService,
              public authService: AuthService,
              public dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.getAllCategories();
  }
  createCategory(category: Category){
    return this.categoryService.createCategroy(category).subscribe((cat)=>{
      console.log(cat);
    });
  }
  getAllCategories(){
    this.categoryService.getAllCategories().subscribe((categories)=>{
      this.allCategories= categories;console.log(this.allCategories);
    });
  }
  displayedColumns: string[] = ['select', 'name', 'description', 'actions'];
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.allCategories!.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.allCategories!.forEach(row => this.selection.select(row));
  }
  deleteSelected(){
    this.selection.selected.forEach((selectedCategory)=>{
      this.deleteCategory(selectedCategory.id!);
    });
  }
  deleteCategory(idCat: number){
    this.categoryService.deleteCategory(idCat).subscribe(()=>{
      this.getAllCategories();
    });
  }
  openDialog(idCat: number): void {
    this.categoryService.getCategory(idCat).subscribe((cat)=>{
      this.categoryData = cat;
      const dialogRef = this.dialog.open(DialogModifyCategoryComponent, {
        data: {category: this.categoryData},
      });

      dialogRef.afterClosed().subscribe(result => {
        this.getAllCategories();
      });
    });

  }
}
