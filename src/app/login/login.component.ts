import {Component, Input} from '@angular/core';
import {User} from "../model/user.model";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {Role} from "../model/role.model";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Input()
  newUser = new User();
  @Input()
  user = new User();
  err :number = 0;
  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router) { }
  ngOnInit(): void {
  }
  onLoggedin(){
    this.authService.login(this.user).subscribe({
      next: (data) => {console.log("this is"+data);
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        if(this.authService.isAdmin())
          this.router.navigate(['/']);
        this.router.navigate(['products']);
      },
      error: (err: any) => {
        this.err = 1;
      }
    });
  }
  createUser(user: User){
    user.enabled = true;
    this.userService.createUser(user).subscribe(()=>{
      let role = new Role(2,"USER");
      this.userService.addRoleToUser(user.username, role).subscribe();
    })
  }
}
