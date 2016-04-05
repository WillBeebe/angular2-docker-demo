import { Component, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { Router, RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

let styles = require('./users.css');
let template = require('./users.html');

// https://github.com/auth0/angular2-jwt
@Component({
    selector: 'users',
    providers: [UserService],
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES],
    template: template,
    styles: [styles]
})
export class UsersComponent implements OnInit {
    public users: Array<User>;

    constructor(private _router: Router,
                private _userService: UserService) {
    }

    ngOnInit() {
        if (!localStorage.getItem('jwt')) {
            this._router.navigateByUrl('/login');
            return;
        }
        this.getReports();
    }

    getReports() {
        this._userService.all().subscribe(users => this.users = users);
    }

    editUser(user: User) {
        let link = ['User', { id: user._id }];
        this._router.navigate(link);
    }
}
