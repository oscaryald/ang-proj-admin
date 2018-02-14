import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ActivatedRoute, Params, Router} from "@angular/router";

import {UserService} from '../../shared/service/user.service';
import {User} from '../../shared/models/user.models';
import {Messages} from "../../shared/models/messages.models";

import {AuthService} from "../../shared/service/auth.service";

@Component({
  selector: 'apa-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public message: Messages;

  constructor(
      private userService: UserService,
      private authService: AuthService,
      private router: Router,
      private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  	this.form = new FormGroup({
  		'email': new FormControl(null, [Validators.required, Validators.email]),
  		'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
  	});

  	this.message = new Messages('', '');

  	this.route.queryParams
          .subscribe((params: Params) => {
              if ( params['nowCanLogin'] ) {
                  this.showMessage({
                      text: 'now you can enter to the admin',
                      type: 'success'
                  });
              }
          });
  }

  onSubmit() {
  	console.log(this.form.value.email);
  	const formData = this.form.value;

  	this.userService.getUserByEmail(formData.email)
        .subscribe((user: User) => {
  	        if(user){
  	            if(formData.password === user.password){
  	                window.localStorage.setItem('user', JSON.stringify(user));
  	                this.message.text = '';
                    this.authService.login();
                    this.router.navigate(['/system', 'bill']);
                }else{
  	               this.showMessage({
                       text: 'password not valid',
                       type: 'danger'
                   });
                }
            }else{
  	           this.showMessage({
                   text: 'user is not exist',
                   type: 'danger'
               });
            }
        });
  }

  private showMessage(message: Messages) {
    this.message = message;
    setTimeout(() => {
        this.message.text = this.message.type = '';
    }, 3000);
  }

}
