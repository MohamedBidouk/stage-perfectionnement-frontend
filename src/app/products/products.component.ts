import {Component, OnInit} from '@angular/core';
import {Product} from "../model/product.model";
import {ProductService} from "../service/product.service";
import {Observable} from "rxjs";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {Fproduct} from "../model/fproduct.model";
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {SelectionModel} from "@angular/cdk/collections";
import {MatDialog} from "@angular/material/dialog";
import {DialogModifyProductComponent} from "../dialog-modify-product/dialog-modify-product.component";
import {CategoryService} from "../service/category.service";
import {Category} from "../model/category.model";
import {Cart} from "../model/cart.model";
import {CartItem} from "../model/cartItem.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products!: Product[];
  allCategories!: Category[];
  id!: number;
  fileInfos?: Observable<any>;
  allProducts?: Fproduct[];
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<Fproduct>(this.allowMultiSelect, this.initialSelection);
  product!: Product;
  idCategory! : number;
  productName!: string;
  cartItems: CartItem[] = new Array<CartItem>();
  userCart: Cart = new Cart(this.authService.loggedUser, this.cartItems);

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private router: Router,
              public authService: AuthService,
              public dialog: MatDialog
              ) { }
  ngOnInit(): void {
    this.loadAllProducts();
    this.getAllCategories();
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  loadAllProducts(){
    this.productService.getAllProducts().subscribe(allProducts=>{
      this.allProducts = allProducts;console.log(allProducts);
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
  displayedColumns: string[] = ['select', 'name', 'description', 'price', 'actions'];

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.allProducts!.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.allProducts!.forEach(row => this.selection.select(row));
  }
  deleteSelected(){
    this.selection.selected.forEach((fproduct)=>{
      this.deleteProduct(fproduct.id);
    });
  }
  openDialog(productId: number): void {
    this.productService.consultProduct(productId).subscribe((prod)=>{
      this.product = prod;
      const dialogRef = this.dialog.open(DialogModifyProductComponent, {
        data: {product: this.product, allCategories: this.allCategories},
        height: '500px',
        width: '600px'
      });

      dialogRef.afterClosed().subscribe(result => {
        this.loadAllProducts();
      });
    });
  }
  getAllCategories(){
    this.categoryService.getAllCategories().subscribe((categories)=>{
      this.allCategories= categories;
    });
  }
  onCategorySelect(catId: number){
    if (this.idCategory != undefined){
      this.productService.getProductsByCategory(catId).subscribe((products)=>{
        this.allProducts = products;console.log(products);
      });
    }else this.loadAllProducts();
  }
  searchByName(event: any){
    if (event.target.value != null && event.target.value.length>0){
      this.productService.searchPerName(event.target.value).subscribe((prods)=>{
        this.allProducts = prods;
      });
    }else {
      this.loadAllProducts();
    }
  }
  setCategory(productId: number, categoryId: number){
   this.productService.setCategory(productId, categoryId).subscribe((prod)=>{
     console.log(prod);
   })
  }
  getCategory(productId: number): Category{
    let cat = new Category();
    this.productService.getCategory(productId).subscribe((category)=>{
      cat = category;
    });
    return cat;
  }
  addToCart(product: Product){
    let cartIt = new CartItem(product, 1);

    this.userCart.cartItems.push(cartIt);
    console.log(this.userCart.cartItems.indexOf(cartIt));
    let total = 0;
    this.userCart.cartItems.forEach((cartItem)=>{
      total += cartItem.product.price! * cartItem.quantity;
    })
    this.userCart.totalCost = total;
    console.log(this.userCart);
  }
}
