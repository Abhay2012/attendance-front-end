import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomHttpService } from './custom-http.service';


@Injectable()
export class LoginService {

    constructor(
        private customHttp: CustomHttpService,
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
