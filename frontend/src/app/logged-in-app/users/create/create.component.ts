import { Component } from 'angular2/core';
import { Router, RouterLink } from 'angular2/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Http } from 'angular2/http';
import { contentHeaders } from '../../../common/headers';

import { UserService } from '../../../../services/user.service.ts';

let styles   = require('./create.css');
let template = require('./create.html');

@Component({
    selector: 'create-user',
    providers: [UserService],
    directives: [ RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES ],
    template: template,
    styles: [ styles ]
})
export class UserCreateComponent {
    constructor(private _router: Router, private _userService: UserService, public http: Http) {
    }

    create(event, name, email, admin) {
        event.preventDefault();

        var user = {
            name: name,
            email: email,
            admin: admin,
            password: 1234
        };

        this._userService.create(user);
        this._router.navigate( ['Users'] );
    }
}
