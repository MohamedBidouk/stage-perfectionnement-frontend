import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {User} from "../model/user.model";
import {AuthService} from "../service/auth.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SelectionModel} from "@angular/cdk/collections";
import {Fproduct} from "../model/fproduct.model";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  allUsers!: User[];
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<User>(this.allowMultiSelect, this.initialSelection);
  constructor(private userService: UserService,
              public authService: AuthService) {
  }
  ngOnInit(): void {
    this.loadAllUsers();
  }

  loadAllUsers(){
    this.userService.findAllUsers().subscribe((users)=>{
      this.allUsers = users;console.log(users);
      }
    )
  }
  deleteUser(id: number){
    this.userService.deleteUser(id).subscribe(()=>{
      this.loadAllUsers();
    })
  }
  deleteSelectedUsers(){
    this.selection.selected.forEach((user)=>{
      this.deleteUser(user.user_id);
    });
  }
  displayedColumns: string[] = ['select', 'username', 'enabled', 'roles', 'actions'];

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.allUsers!.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.allUsers!.forEach(row => this.selection.select(row));
  }
}
