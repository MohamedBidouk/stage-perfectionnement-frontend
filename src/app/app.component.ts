import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'stage-perfectionnement';
  constructor(private router: Router,
              public authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.loadToken();
    if(this.authService.getToken() == null || this.authService.isTokenExpired())
      this.router.navigate(['login']);
    this.router.navigate(['products']);
    this.authService.isloggedIn = true;
  }
  logout(){
    this.authService.logout();
  }
}
