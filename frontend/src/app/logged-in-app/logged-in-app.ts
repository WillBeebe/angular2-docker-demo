/// <reference path="../../../typings/tsd.d.ts" />

import { Component } from 'angular2/core';
import { Location, RouteConfig, RouterLink, Router } from 'angular2/router';
import { CORE_DIRECTIVES } from 'angular2/common';
import { ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import { LoggedInRouterOutlet } from './LoggedInOutlet';

let template = require('./logged-in-app.html');
let styles = require('./logged-in-app.css');

let jwtDecode = require('jwt-decode');

@Component({
  selector: 'logged-in-app',
  template: template,
  styles: [styles],
  directives: [LoggedInRouterOutlet, CORE_DIRECTIVES, ROUTER_DIRECTIVES ]
})

export class LoggedInAppComponent {
  public isAdmin: boolean;

  constructor(public router: Router) {
    var jwt = localStorage.getItem('jwt');
    if (jwt) {
    var decodedJwt = jwtDecode(jwt);
      this.isAdmin = decodedJwt._doc.admin;
    }
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigateByUrl('/login');
  }
}
