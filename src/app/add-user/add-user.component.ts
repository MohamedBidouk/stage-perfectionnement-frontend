import {Component, Input} from '@angular/core';
import {UserService} from "../service/user.service";
import {AuthService} from "../service/auth.service";
import {User} from "../model/user.model";
import {Role} from "../model/role.model";
import {UserComponent} from "../user/user.component";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  @Input()
  newUser = new User();
  panelOpenState = false;
  constructor(private userService: UserService) {
  }
  createUser(user: User){
    user.enabled = true;
    this.userService.createUser(user).subscribe(()=>{
      let role = new Role(2,"USER");
      this.userService.addRoleToUser(user.username, role).subscribe();
    })
  }

}
