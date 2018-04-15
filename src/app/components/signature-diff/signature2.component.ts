import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { People } from '../../models/people';
import { PeopleService } from '../../providers/people.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
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

    constructor(
        private peopleService: PeopleService,
        private router: Router,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
        this.person = this.peopleService.clickedPerson;
        this.personGroupName = this.peopleService.groupName;
        // in case of refresh
        if (!this.person) {
            this.routeBack();
        }
        /**iniitalize the jquery plugin used for signature */
        $('#signature').jSignature();

    }

    // onPreviewBtn() {
    //     const datapair = $('#signature').jSignature('getData', 'svgbase64');

    //     if (this.emptySign(datapair[1])) { return; }

    //     this.signString = 'data:' + datapair[0] + ',' + datapair[1];
    //     this.signString = <string>this.sanitizer.bypassSecurityTrustUrl(this.signString);
    // }

    emptySign(datapair: string) {
        return datapair === `PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMCIgaGVpZ2h0PSIwIj48L3N2Zz4=`;

    }

    onResetBtn() {
        // clears the canvas and rerenders the decor on it.
        $('#signature').jSignature('reset');
        // this.signString = null;
    }


    onSave() {
        this.person.present = true;
        this.person.sign = this.setPersonSign();
        this.routeBack();
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
    // onCancel() {
    //     this.routeBack();
    // }

    routeBack() {
        this.router.navigate(['../'], { relativeTo: this.route });

    }


}
