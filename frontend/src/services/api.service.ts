import { Http, Headers, URLSearchParams } from 'angular2/http';

import { Config } from '../config/config';

var jwtDecode = require('jwt-decode');

export class ApiService {
    public jwt: string;
    private decodedJwt: string;

    constructor(public type: string, public http: Http) {
        this.jwt = localStorage.getItem('jwt');
        this.decodedJwt = this.jwt && jwtDecode(this.jwt);
    }

    _getBase() {
        return Config.getInstance().getApiURL() + `/api/${this.type}s`;
    }

    _types() {
        return `${this.type}s`;
    }

    // TODO: on 403, re-log in
    all() {
        console.log(`GET: ${this._getBase()}`);

        var params = new URLSearchParams();
        params.set('token', this.jwt);

        return this.http.get(`${this._getBase()}`, {search: params})
            .map((res) =>  {
                return res.json()[`${this.type}s`];
            });
    }

    find(id: string) {
        console.log(`GET: ${this._getBase()}/${id}`);

        var params = new URLSearchParams();
        params.set('token', this.jwt);

        return this.http.get(`${this._getBase()}/${id}`, {search: params})
            .map((res) =>  {
                return res.json()[this.type];
            });
    }

    create(model: Object) {
        console.log(`POST: ${this._getBase()}`);

        var params = new URLSearchParams();
        params.set('token', this.jwt);

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        var body: any = {};
        body[this.type] = model;
        var bodyString = JSON.stringify(body);

        this.http.post(this._getBase(), bodyString, {search: params, headers: headers})
            .subscribe(
                //data => this.randomQuote = data,
                err => this._logError(err),
                () => console.log('Post Complete')
            );
    }

    update(model: Object) {
        console.log(`PUT: ${this._getBase()}`);

        var params = new URLSearchParams();
        params.set('token', this.jwt);

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        var body: any = {};
        body[this.type] = model;
        var bodyString = JSON.stringify(body);

        this.http.put(this._getBase(), bodyString, {search: params, headers: headers})
            .subscribe(
                //data => this.randomQuote = data,
                err => this._logError(err),
                () => console.log('Update Complete')
            );
    }

    delete(id: String) {
        console.log(`DELETE: ${this._getBase()}`);

        var params = new URLSearchParams();
        params.set('token', this.jwt);

        this.http.delete(`${this._getBase()}/${id}`, {search: params})
            .subscribe(
                //data => this.randomQuote = data,
                err => this._logError(err),
                () => console.log('Delete Complete')
            );
    }

    _logError(err) {
        console.log(err);
    }
}
