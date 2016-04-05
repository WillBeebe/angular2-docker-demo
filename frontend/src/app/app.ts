/// <reference path="../../typings/tsd.d.ts" />

import { Component } from 'angular2/core';
import { Location, RouteConfig, RouterLink, Router } from 'angular2/router';
import { CORE_DIRECTIVES } from 'angular2/common';
import { ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import { LoggedInRouterOutlet } from './logged-in-app/LoggedInOutlet';

import { LoginComponent } from './login/login.component';
import { LoggedInAppComponent } from './logged-in-app/logged-in-app';

import { UsersComponent } from './logged-in-app/users/users.component';
import { UserComponent } from './logged-in-app/users/user/user.component';
import { UserCreateComponent } from './logged-in-app/users/create/create.component';

let template = require('./app.html');
let styles = require('./app.css');

let jwtDecode = require('jwt-decode');

@Component({
  selector: 'app',
  template: template,
  styles: [styles],
  directives: [LoggedInAppComponent, CORE_DIRECTIVES, ROUTER_DIRECTIVES ]
})
@RouteConfig([
  { path: '/', redirectTo: ['/Login'] },
  { path: '/login', component: LoginComponent, as: 'Login' },

  { path: '/app/users', component: UsersComponent, as: 'Users' },
  { path: '/app/users/create', component: UserCreateComponent, as: 'UserCreate' },
  { path: '/app/users/:id', component: UserComponent, as: 'User' }
])

export class App {

  constructor(public router: Router) {
  }
}
