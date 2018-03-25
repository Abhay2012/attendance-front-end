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

/**Do not confuse with name signature2, there is no other component with name signature1 */

export class Signature2Component implements OnInit {


    person: People;
    signString: string;

    constructor(
        private peopleService: PeopleService,
        private router: Router,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
        this.person = this.peopleService.clickedPerson;
        /**iniitalize the jquery plugin used for signature */
        $('#signature').jSignature();

    }

    onDoneBtn() {
        const datapair = $('#signature').jSignature('getData', 'svgbase64');
        // const i = new Image();
        console.log(datapair);

        this.signString = 'data:' + datapair[0] + ',' + datapair[1];
        this.signString = <string>this.sanitizer.bypassSecurityTrustUrl(this.signString);
    }
   
    onResetBtn() {
        // clears the canvas and rerenders the decor on it.
        $('#signature').jSignature('reset');
        this.signString = null;
    }

    closeModalAndEmit(e?: any) {

        /**e will be null when Cancel or top right cross brn is pressed */
        // $('#myModal').modal('hide');
        // if (!e) {
        //     this.router.navigate(['../main'], { relativeTo: this.route });

        //     return;
        // }
        // // this.signatureString.emit(this.signString);
        // this.onDoneBtn();
        // console.log(this.signString);
        // if (this.peopleService.clickedPerson) {

        //     this.signString && (this.peopleService.clickedPerson.signed = true);
        // }
        // console.log(this.peopleService.clickedPerson);
        // this.router.navigate(['../main'], { relativeTo: this.route });

    }


}
