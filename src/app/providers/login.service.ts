import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class LoginService {

    constructor(private http: HttpClient,
        //   private toast: MyToastService
    ) { }

    login(data) {
        // blog: https://coryrylan.com/blog/angular-multiple-http-requests-with-rxjs
        // const login_api = `${API}/oauth/token?grant_type=password&username=${data.username}&password=${data.password}`;
        // return this.http.post(login_api, {}).pipe(
        //   mergeMap((res: Token) => {
        //     localStorage.setItem('access_token', res.access_token);
        //     return this.http.get(`${API}/management/info`);
        //   })
        // );

        return of({});

    }

    isLoggedIn = () => {
        return localStorage.getItem('access_token') ? true : false;
      }

    // storeUserInfo = (userInfo: UserInfo): Observable<any> => {
    //     return Observable.create((observer) => {
    //         Object.keys(userInfo).forEach((key, index) => {
    //             localStorage.setItem(key, userInfo[key]);
    //         });
    //         observer.next('success');
    //         observer.complete();
    //     });
    // }

    // logout = () => {
    //     return this.http.get(`${API}/logout`);

    // }

}
