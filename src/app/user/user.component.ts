import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {User} from "../model/user.model";
import {AuthService} from "../service/auth.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  allUsers!: User[];
  form!: FormGroup;
  constructor(private userService: UserService,
              public authService: AuthService,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      selected : this.formBuilder.array([],[Validators.required])
    })
  }
  ngOnInit(): void {
    this.loadAllUsers();
  }

  loadAllUsers(){
    this.userService.findAllUsers().subscribe((users)=>{
      this.allUsers = users;
      }
    )
  }
  userSelected(e: any){
    const selected : FormArray = this.form.get('selected') as FormArray;
    if (e.target.checked) {
      selected.push(new FormControl(e.target.value));
    } else {
      const index = selected.controls.findIndex(x => x.value === e.target.value);
      selected.removeAt(index);
    }
  }
  deleteUser(id: number){
    this.userService.deleteUser(id).subscribe(()=>{
      this.loadAllUsers();
    })
  }
  deleteSelectedUsers(){
    let i = 0;
    while (i<this.form.value.selected.length){
      this.deleteUser(this.form.value.selected.at(i));
      i++;
    }
  }
}
