import {Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";

import {User} from "../models/user.models";

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getUserByEmail(email: string): Observable<User> {
        const url = 'http://localhost:3000/';
        return this.http.get(`${url}users?email=${email}`)
            .map((response: Response) => {
                const users = response.json()
                return users;
            }).map((users: User[]) => {
                let user: User;
                for (let i = 0; i < users.length; i++) {

                    if (users[i]['email'] === email) {
                        user = users[i];
                        break;
                    }
                }
                return user;
            });
    }

    createNewUser(user: User): Observable<User> {
        const url = 'http://localhost:3000/';
        return this.http.post(`${url}users`, user)
            .map((response: Response) => {
                const users = response.json();
                return users;
            });
    }
}