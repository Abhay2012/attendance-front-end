import { CanActivate, Router } from '@angular/router';
import {  Injectable } from '@angular/core';
import { LoginService } from '../providers/login.service';

@Injectable()
export class LoginPageGuard implements CanActivate {

    constructor(
        private router: Router,
        private loginService: LoginService
    ) { }

    canActivate() {
        if (this.loginService.isLoggedIn()) {
            this.router.navigate(['/app']);
            return false;
        } else {
            return true;
        }
    }

}
