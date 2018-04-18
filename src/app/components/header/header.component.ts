import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PeopleService } from '../../providers/people.service';
import { LoaderService } from '../../providers/loader.service';
import { ToastService } from '../../providers/toast.service';
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
    isAdmin = JSON.parse(localStorage.getItem('role')) === 'admin';
    file: File;

    // for password change
    oldPwd: string;
    newPwd: string;

    constructor(
        private router: Router,
        private peopleService: PeopleService,
        private ls: LoaderService,
        private ts: ToastService
    ) {

        this.setNavbarContent();
    }

    setNavbarContent() {
        if (this.isAdmin) {
            this.navs = [
                { title: 'Hem', routerLink: 'main' },
                { title: 'Adresser', routerLink: 'addresses' },
                { title: 'Adresser office', routerLink: 'teachers' },
                { title: 'Ladda upp excel fil', routerLink: 'uploadStudents' }
            ];
        } else {

            // in case of teacher (address common login), show previous attendance page 
            if (JSON.parse(localStorage.getItem('role')) === 'teacher') {
                this.navs = [{ title: 'Tidigare historik', routerLink: 'previousAttendance' }];
            } else {
                // in case of address
                this.navs = [{ title: 'Hem', routerLink: 'main' }];
            }
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
        this.ls.showLoader();
        let sendMailForm = new FormData();
        sendMailForm.append('avatar', this.file);
        for (let key of Object.keys(form.value)) {
            sendMailForm.append(key, form.value[key]);
        }
        this.peopleService.sendMail(sendMailForm).subscribe((res: any) => {
            this.ls.hideLoader();
            this.ts.showSuccess('Mail Sent Successfully');
        }, (err: any) => {
            this.ls.hideLoader();
            this.ts.showError(err.msg);
        });
        this.closeNavBar();
    }

    onAbsentMessage() {
        this.closeNavBar();
        this.router.navigate(['/app/absentMessages']);

    }

    onPasswordChange() {
        $('#pwdChange').modal('show');
        this.closeNavBar();

    }

    changePwd() {
        const username = JSON.parse(localStorage.getItem('username'));
        this.ls.showLoader();
        this.peopleService.changePwd(this.oldPwd, this.newPwd, username)
            .subscribe((res: any) => {
                this.ls.hideLoader();
                this.ts.showSuccess('Password changed successfully');
                $('#pwdChange').modal('hide');
            }, (err: any) => {
                this.ts.showError(err.msg);
                this.ls.hideLoader();
            });
    }
}
