import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { People } from '../../models/people';
declare const $;

@Component({
    selector: 'app-signature',
    templateUrl: './signature.component.html',
    // styleUrls: ['./signature.component.scss'],
})

export class SignatureComponent implements OnInit {

    @Output() signatureString: EventEmitter<string> = new EventEmitter<string>();


    signString: string;

    constructor(
    ) { }

    ngOnInit() {
        /**iniitalize the jquery plugin used for signature */
        $('#signature').jSignature();

    }

    onDoneBtn() {
        const datapair = $('#signature').jSignature('getData', 'svgbase64');
        const i = new Image();
        this.signString = 'data:' + datapair[0] + ',' + datapair[1];
    }

    onResetBtn() {
        // clears the canvas and rerenders the decor on it.
        $('#signature').jSignature('reset');
        this.signString = null;
    }

    closeModalAndEmit(e?: any) {

        /**e will be null when Cancel or top right cross brn is pressed */
        $('#myModal').modal('hide');
        if (!e) {
            return;
        }
        this.signatureString.emit(this.signString);
    }

}
