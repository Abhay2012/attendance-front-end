import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {

    navs: Array<{ title: string, routerLink: string }>;

    constructor(
        private router: Router
    ) {

        this.navs = [
            { title: 'Main', routerLink: 'main' },
            { title: 'Addresses', routerLink: 'addresses' },
        ];
    }

    onLogout() {
        localStorage.clear();
        // this.router.navigate(['/login']);
        location.reload();

    }
}
