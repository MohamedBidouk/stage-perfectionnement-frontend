import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Category} from "../model/category.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl = "http://localhost:8080/stage-perfectionnement/api/cat"
  constructor(private http: HttpClient) { }

  createCategroy(category: Category): Observable<Category>{
    var formData : any = new FormData();
    formData.append('name', category.name);
    formData.append('description', category.description);
    return this.http.post<Category>(this.apiUrl, formData);
  }
  getAllCategories():Observable<Category[]>{
    return this.http.get<Category[]>(this.apiUrl);
  }
  deleteCategory(idCat: number){
    return this.http.delete(`${this.apiUrl}/${idCat}`)
  }
  getCategory(idCat: number){
    return this.http.get<Category>(`${this.apiUrl}/${idCat}`);
  }
  updateCategory(idCat: number, category: Category):Observable<Category>{
    return this.http.put<Category>(`${this.apiUrl}/${idCat}`, category);
  }
}
