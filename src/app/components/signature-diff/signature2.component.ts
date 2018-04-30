import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { People } from '../../models/people';
import { PeopleService } from '../../providers/people.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { LoaderService } from '../../providers/loader.service';
import { ToastService } from '../../providers/toast.service';
declare const $;

@Component({
    selector: 'app-signature2',
    templateUrl: './signature2.component.html',
    styleUrls: ['./signature2.component.scss'],
})

/**Do not get confused with name signature2, there is no other component with name signature1 */

export class Signature2Component implements OnInit {


    person: People;
    personGroupName: string;
    signString: string;
    isAddress; // TRUE : when this component is used to take attendance
    // FALSE: when it is  used to change the existing attendnace(ABSENT)

    constructor(
        private peopleService: PeopleService,
        private router: Router,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer,
        private ls: LoaderService,
        private ts: ToastService
    ) { }

    ngOnInit() {
        this.person = this.peopleService.clickedPerson;
        this.personGroupName = this.peopleService.groupName;

        console.log(this.person);
        console.log(this.peopleService.attendanceId);
        if (this.peopleService.attendanceId) { this.isAddress = false; }
        this.isAddress = JSON.parse(localStorage.getItem('userInfo'))[0].role === 'address';
        console.log(this.isAddress);
        // in case of refresh
        if (!this.person) {
            this.routeBack();
        }
        /**iniitalize the jquery plugin used for signature */
        $('#signature').jSignature();

    }

    emptySign(datapair: string) {
        return datapair === `PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMCIgaGVpZ2h0PSIwIj48L3N2Zz4=`;

    }

    onResetBtn() {
        // clears the canvas and rerenders the decor on it.
        $('#signature').jSignature('reset');
    }


    onSave() {
        this.person.present = true;
        this.person.sign = this.setPersonSign();
        this.routeBack();
    }

    onUpload() {

        const p = <any>this.person;
        if (`${this.setPersonSign()}` == 'null') { return; } // ignore empty sign
        const newData: any = { _id: this.peopleService.attendanceId };
        const newAtt: any = {
            id: p.id,
            name: p.name,
            present: true,
            sign: this.setPersonSign()
        };

        newData.data = newAtt;

        this.ls.showLoader();
        this.peopleService.changeAttendancStatus(newData)
            .subscribe((res: any) => {
                this.ls.hideLoader();
                this.ts.showSuccess('Attendance changed successfully');
                this.routeBack();
            }, (err: any) => {
                this.ls.hideLoader();
                this.ts.showError(err.msg);
            });
    }
    setPersonSign() {
        const datapair = $('#signature').jSignature('getData', 'svgbase64');
        const s = 'data:' + datapair[0] + ',' + datapair[1];
        if (this.emptySign(datapair[1])) {
            // reset the present and sign 
            this.person.present = null;
            return null;
        }
        return s;
    }


    routeBack() {
        if (this.isAddress) {
            this.router.navigate(['../'], { relativeTo: this.route });
        } else {
            this.router.navigate(['/app/main']);
        }
    }


}
