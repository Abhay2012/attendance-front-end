import { Injectable } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ToastOptions } from 'ng2-toastr/src/toast-options';

@Injectable()
export class ToastService {

    constructor(
        public toastr: ToastsManager,
    ) {    }

    
    showSuccess(msg: string) {
        this.toastr.success(msg, 'Success!');
    }

    showError(msg: string) {
        this.toastr.error(msg, 'Oops!');
    }

    // showWarning() {
    //     this.toastr.warning('You are being warned.', 'Alert!');
    // }

    // showInfo() {
    //     this.toastr.info('Just some information for you.');
    // }

    // showCustom() {
    //     this.toastr.custom('<span style="color: red">Message in red.</span>', null, { enableHTML: true });
    // }


}
