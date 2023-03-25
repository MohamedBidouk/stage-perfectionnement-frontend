import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {User} from "../model/user.model";
import {AuthService} from "../service/auth.service";
import {SelectionModel} from "@angular/cdk/collections";
import {MatDialog} from "@angular/material/dialog";
import {DialogModifyUserComponent} from "../dialog-modify-user/dialog-modify-user.component";

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
  user!: User;
  constructor(private userService: UserService,
              public authService: AuthService,
              public dialog: MatDialog) {
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
  modifyUser(userId: number){

  }
  deleteSelectedUsers(){
    this.selection.selected.forEach((user)=>{
      this.deleteUser(user.user_id);
    });
  }
  openDialog(userId: number): void {
    this.userService.consultUser(userId).subscribe((user)=>{
      this.user = user;console.log(user);
      const dialogRef = this.dialog.open(DialogModifyUserComponent, {
        data: {user: this.user},
        height: '500px',
        width: '600px'
      });

      dialogRef.afterClosed().subscribe(result => {
        this.loadAllUsers();
      });
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
