import { Component, Input, Output, EventEmitter } from '@angular/core';
import { People } from '../../models/people';
declare const $;

@Component({
    selector: 'app-signature',
    templateUrl: './signature.component.html',
    // styleUrls: ['./signature.component.scss'],
})

export class SignatureComponent {

    @Output() signatureString: EventEmitter<string> = new EventEmitter<string>();


    signString: string;

    constructor(
    ) { }

    closeModalAndEmit() {
        this.signatureString.emit(this.signString);
        $('#myModal').modal('hide');
    }

}
