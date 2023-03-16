import { Injectable } from '@angular/core';
import {Product} from "../model/product.model";
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductPhoto} from "../model/productPhoto.model";
import {Fproduct} from "../model/fproduct.model";
const optionRequete = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin':'*'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl: string="http://localhost:8080/stage-perfectionnement/api";
  apiUrlPhoto: string="http://localhost:8080/stage-perfectionnement/";
  products!: Product[];
  product!: Product;
  constructor(private http: HttpClient) { }
  listProducts():Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl+"/all");
  }
  addProducts(product: Product): Observable<Product>{
    return this.http.post<Product>(this.apiUrl, product);
  }
  deleteProduct(productId: number){
    return this.http.delete(this.apiUrl+"/"+productId);
  }
  upload(file: File, id: number): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('photo', file);

    const req = new HttpRequest('POST', `${this.apiUrlPhoto}${id}/photos`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getPhotos(id: number): Observable<any> {
    return this.http.get(`${this.apiUrlPhoto}${id}/photos`);
  }

  getAllProducts():Observable<Fproduct[]>{
    return this.http.get<Fproduct[]>(this.apiUrl+"/allProducts");
  }
  consultProduct(productId: number):Observable<Fproduct>{
    return this.http.get<Fproduct>(`${this.apiUrl}/${productId}/detail`);
  }
  updateProduct(product: Product, id: number): Observable<Product>{
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }
  searchPerCategory(idCat: number){

  }

}
