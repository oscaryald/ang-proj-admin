import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {UserService} from '../../shared/service/user.service';
import {User} from '../../shared/models/user.models';
import {Messages} from "../../shared/models/messages.models";

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
  ) { }

  ngOnInit() {
  	this.form = new FormGroup({
  		'email': new FormControl(null, [Validators.required, Validators.email]),
  		'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
  	});
  	this.message = new Messages('', '');
  }

  onSubmit() {
  	console.log(this.form.value.email);
  	const formData = this.form.value;

  	this.userService.getUserByEmail(formData.email)
        .subscribe((user: User) => {
  	        if(user){
  	            if(formData.password === user.password){

                }else{
  	               this.showMessage('password not valid');
                }
            }else{
  	           this.showMessage('user is not exist');
            }
        });
  }

  private showMessage(text: string, type: string = 'danger') {
    this.message = new Messages(type, text);
    setTimeout(() => {
        this.message.text = this.message.type = '';
    }, 3000);
  }

}
