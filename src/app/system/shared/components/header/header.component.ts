import { Component, OnInit } from '@angular/core';
import {User} from "../../../../shared/models/user.models";
import {AuthService} from "../../../../shared/service/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'apa-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  date: Date = new Date();
  user: User;

  constructor(
      private authServise: AuthService,
      private router: Router
  ) { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
  }

  onLogout(){
    this.authServise.logout();
    this.router.navigate(['/login']);
  }

}
