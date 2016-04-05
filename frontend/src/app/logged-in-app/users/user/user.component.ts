import { Component, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { Router, RouteParams, RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import { ToasterContainerComponent, ToasterService } from 'angular2-toaster/angular2-toaster';

import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';

let styles = require('./user.css');
let template = require('./user.html');

// https://github.com/auth0/angular2-jwt
@Component({
    selector: 'user',
    providers: [UserService, ToasterService],
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, ToasterContainerComponent],
    template: template,
    styles: [styles]
})
export class UserComponent implements OnInit {
    public user: User;

    constructor(private _router: Router,
                private _userService: UserService,
                private _routeParams: RouteParams,
                private _toasterService: ToasterService) {
    }

    ngOnInit() {
        if (!localStorage.getItem('jwt')) {
            this._router.navigateByUrl('/login');
            return;
        }
        let id = this._routeParams.get('id');
        this.getUser(id);
    }

    getUser(id: string) {
        this._userService.find(id).subscribe(user => this.user = user);
    }

    save() {
        this._userService.update(this.user);
        this._toasterService.pop('success', 'SAVED', this.user.name);
    }

    delete(id) {
        this._userService.delete(id);
        this._toasterService.pop('success', 'DELETED', this.user.name);
        this._router.navigate( ['Users'] );
    }
}
