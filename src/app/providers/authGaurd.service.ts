import { CanActivate, Router } from '@angular/router';
import {  Injectable } from '@angular/core';
import { LoginService } from '../providers/login.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private loginService: LoginService
    ) { }

    canActivate() {
        if (this.loginService.isLoggedIn()) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }

}
