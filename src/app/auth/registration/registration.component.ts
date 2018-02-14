import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {UserService} from "../../shared/service/user.service";
import {User} from "../../shared/models/user.models";
import {Observable} from "rxjs/Observable";


@Component({
  selector: 'apa-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  constructor(
      private userService: UserService,
      private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
        'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
        'name': new FormControl(null, [Validators.required]),
        'agree': new FormControl(false, [Validators.requiredTrue]),
    });
  }

    onSubmit() {
      const {email, password, name} = this.form.value;
      const user = new User(email, password, name);
      this.userService.createNewUser(user)
          .subscribe(() => {
            console.log(user);
            this.router.navigate(['/login'], {
              queryParams: {
                nowCanLogin: true
              }
            });
          });
    }

    forbiddenEmails(control: FormControl): Promise<any>{
      return new Promise((resolve, reject) => {
         this.userService.getUserByEmail(control.value)
             .subscribe((user: User) => {
                if(user){
                    resolve({forbiddenEmail: true});
                }else{
                    resolve(null);
                }
             })
      });
    }

}
