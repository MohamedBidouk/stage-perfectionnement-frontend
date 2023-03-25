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

  apiUrl="http://localhost:8080/stage-perfectionnement/users/";

  createUser(user :User):Observable<any>{
    return this.http.post(`${this.apiUrl}createUser`, user);
  }
  findAllUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}allUser`)
  }
  deleteUser(id: number){
    return this.http.delete(this.apiUrl+id);
  }
  addRoleToUser(username: string, role: Role){
    return this.http.put(`${this.apiUrl}addRole/${username}`, role);
  }
  removeRoleToUser(username: string, role: Role){
    return this.http.put(`${this.apiUrl}removeRole/${username}`, role);
  }
  modifyUser(userId: number, user: User){
    return this.http.put(`${this.apiUrl}modify/${userId}`, user);
  }
  consultUser(userId: number):Observable<User>{
    return this.http.get<User>(`${this.apiUrl}${userId}`);
  }
}
