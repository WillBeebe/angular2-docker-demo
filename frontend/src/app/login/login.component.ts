import { Component } from 'angular2/core';
import { Router, RouterLink } from 'angular2/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Http, Headers } from 'angular2/http';
import { contentHeaders } from '../common/headers';
import { Config } from '../../config/config';

let styles   = require('./login.css');
let template = require('./login.html');


@Component({
  selector: 'login',
  directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES ],
  template: template,
  styles: [ styles ]
})
export class LoginComponent {
  constructor(public router: Router, public http: Http) {
  }

  login(event, username, password) {
    event.preventDefault();
    let body = JSON.stringify({ name: username, password: password });
    this.http.post(Config.getInstance().getApiURL() + '/auth', body, { headers: contentHeaders })
      .subscribe(
        response => {
          localStorage.setItem('jwt', response.json().token);
          this.router.navigateByUrl('/app/users');
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }
}
