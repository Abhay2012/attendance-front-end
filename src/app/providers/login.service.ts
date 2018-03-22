import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { catchError, map, tap, delay } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CustomHttpService } from './custom-http.service';


@Injectable()
export class LoginService {

    constructor(
        private customHttp: CustomHttpService,
        //   private toast: MyToastService
    ) { }

    login(data) {


        return this.customHttp.postForLogin(data);

    }

    isLoggedIn = () => {
        return localStorage.getItem('access_token') ? true : false;
    }

    updateUserInfo(info: any) {
        localStorage.setItem('access_token', info.token);
        localStorage.setItem('userInfo', JSON.stringify(info.data));
        localStorage.setItem('username', JSON.stringify(info.data[0].username));
    }

    // logout = () => {
    //     return this.http.get(`${API}/logout`);

    // }

}
