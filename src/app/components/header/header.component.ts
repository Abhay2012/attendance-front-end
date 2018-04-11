import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare const $;
declare let html2canvas: any;
declare let jsPDF: any;
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
                { title: 'Hem', routerLink: 'main' },
                { title: 'Adresses', routerLink: 'addresses' },
                { title: 'Handledare', routerLink: 'teachers' },
                { title: 'Ladda upp excel fil', routerLink: 'uploadStudents' },
            ];
        } else {
            this.navs = [
                { title: 'Hem', routerLink: 'main' },
                // { title: 'Tidigare historik', routerLink: 'previousAttendance' },
                
            ];
        }
    }

    onLogout() {
        localStorage.clear();
        // this.router.navigate(['/login']);
        $('.navbar-collapse').collapse('hide');

        location.reload();

    }

    print() {
        html2canvas(document.body, {
            onrendered: (canvas) => {
                var img = canvas.toDataURL('image/jpeg', 1.0);
                var doc = new jsPDF('l', 'mm', [297, 210]);
                doc.addImage(img, 'JPEG', 20, 20, 220, 180);
                doc.save(`schema-attendance.pdf`);
                document.body.style.width = '100%';
                document.body.style.height = '100%';
            }
        })
    }

    closeNavBar() {
        $('.navbar-collapse').collapse('hide');
    }
}
