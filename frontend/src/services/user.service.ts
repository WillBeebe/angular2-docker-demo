import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';

import { ApiService } from './api.service';

@Injectable()
export class UserService extends ApiService {

    constructor(public http: Http) {
        super('user', http);
    }
}
