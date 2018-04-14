import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PeopleService } from "../../providers/people.service";
declare const $;
declare let html2canvas: any;
declare let jsPDF: any;

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [PeopleService]
})

export class HeaderComponent {

    navs: Array<{ title: string, routerLink: string }>;
    isAdmin = JSON.parse(localStorage.getItem('username')) === 'admin';
    file: File;

    constructor(
        private router: Router,
        private peopleService: PeopleService
    ) {

        this.setNavbarContent();
    }

    setNavbarContent() {
        if (this.isAdmin) {
            this.navs = [
                { title: 'Hem', routerLink: 'main' },
                { title: 'Adresser', routerLink: 'addresses' },
                { title: 'Handledare', routerLink: 'teachers' },
                { title: 'Ladda upp excel fil', routerLink: 'uploadStudents' }
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
                let img = canvas.toDataURL('image/jpeg', 1.0);
                let doc = new jsPDF('l', 'mm', [297, 210]);
                doc.addImage(img, 'JPEG', 20, 20, 220, 180);
                doc.save(`schema-attendance.pdf`);
                document.body.style.width = '100%';
                document.body.style.height = '100%';
            }
        })
        this.closeNavBar();
    }

    closeNavBar() {
        $('.navbar-collapse').collapse('hide');
    }

    openModal() {
        $('#sendMail').modal('show');
        this.closeNavBar();
    }

    onFileSelect(ev: any) {
        this.file = ev.target.files[0];
    }

    sendMail(form) {
        let sendMailForm = new FormData();
        sendMailForm.append('avatar', this.file);
        for (let key of Object.keys(form.value)) {
            sendMailForm.append(key, form.value[key]);
        }
        this.peopleService.sendMail(sendMailForm).subscribe((res: any) => {
        }, (err: any) => {
        });
        this.closeNavBar();
    }

    onAbsentMessage() {
        this.closeNavBar();
        this.router.navigate(['/app/absentMessages']);
        
    }
}
