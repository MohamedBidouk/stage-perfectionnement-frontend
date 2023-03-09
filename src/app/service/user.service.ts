import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user.model";
import {Observable} from "rxjs";
import {Role} from "../model/role.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  apiUrl="http://localhost:8081/users/";

  createUser(user :User):Observable<any>{
    return this.http.post(this.apiUrl, user);
  }
  findAllUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}all`)
  }
  deleteUser(id: number){
    return this.http.delete(this.apiUrl+id);
  }
  addRoleToUser(username: string, role: Role){
    return this.http.put(this.apiUrl+username, role);
  }
}
