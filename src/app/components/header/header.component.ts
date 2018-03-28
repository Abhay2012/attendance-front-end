import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare const $;
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {

    navs: Array<{ title: string, routerLink: string }>;

    isAdmin = JSON.parse(localStorage.getItem('username')) === 'admin';

    constructor(
        private router: Router
    ) {

        this.setNavbarContent();
    }

    setNavbarContent() {
        if (this.isAdmin) {
            this.navs = [
                { title: 'Home', routerLink: 'main' },
                { title: 'Addresses', routerLink: 'addresses' },
                { title: 'Upload Students', routerLink: 'uploadStudents' },
            ];
        } else {
            this.navs = [
                { title: 'Home', routerLink: 'main' },
            ];
        }
    }

    onLogout() {
        localStorage.clear();
        // this.router.navigate(['/login']);
        $('.navbar-collapse').collapse('hide');

        location.reload();

    }

    closeNavBar() {
        $('.navbar-collapse').collapse('hide');
    }
}
