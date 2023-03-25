import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Role} from "../model/role.model";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-dialog-modify-user',
  templateUrl: './dialog-modify-user.component.html',
  styleUrls: ['./dialog-modify-user.component.css']
})
export class DialogModifyUserComponent implements OnInit{
  username!: string;
  roles!: Role[];
  roleAdmin: Role = new Role(1, "ADMIN");
  roleUser: Role = new Role(2, "USER");
  allRoles: Role[]= [this.roleAdmin, this.roleUser];

  constructor(private userService: UserService,
              private dialogRef: MatDialogRef<DialogModifyUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  ngOnInit(): void {
    this.username = this.data.user.username;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onOkClick(){
    this.dialogRef.close();
  }
  isRoleExist(role: string, userRole: Role[]): boolean{
    let i = 0;
    while(i<userRole.length){
      if(userRole[i].role == role){
        return true
      }
      i++
    }
    return false;
  }
  roleChecked(roleName: any){
    console.log(this.isRoleExist(roleName, this.data.user.roles));
    if (this.isRoleExist(roleName, this.data.user.roles)&&roleName ==="ADMIN"){
      this.userService.removeRoleToUser(this.data.user.username, this.roleAdmin).
      subscribe((user)=>{
        console.log(user);
      });
    }
    if (this.isRoleExist(roleName, this.data.user.roles)&&roleName ==="USER"){
      this.userService.removeRoleToUser(this.data.user.username, this.roleUser).
      subscribe((user)=>{
        console.log(user);
      });
    }
    if (!this.isRoleExist(roleName, this.data.user.roles)&&roleName ==="ADMIN"){
      this.userService.addRoleToUser(this.data.user.username, this.roleAdmin).
      subscribe((user)=>{
        console.log(user);
      });
    }
    if (!this.isRoleExist(roleName, this.data.user.roles)&&roleName ==="USER"){
      this.userService.addRoleToUser(this.data.user.username, this.roleUser).
      subscribe((user)=>{
        console.log(user);
      });
    }
  }
}
