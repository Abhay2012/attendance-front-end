import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../providers/toast.service';
import { LoaderService } from '../../providers/loader.service';
import { AbsentMessageService } from '../../providers/absent-message.service';


@Component({
    selector: 'app-create-absent-message',
    templateUrl: './createMessage.component.html',
})

export class CreateAbsentMessageComponent {


    absentMessageForm: FormGroup;
    sending = false; // to handle the submit btn press repeatedly

    constructor(
        private fb: FormBuilder,
        private absentMessageService: AbsentMessageService,
        private toastService: ToastService,
        private loaderService: LoaderService

    ) {
        this.initForm();
    }

    initForm() {
        this.absentMessageForm = this.fb.group({
            message: ['', Validators.required],
        });
    }

    get message() {
        return this.absentMessageForm.get('message');
    }

    onSubmit() {
        if (this.sending) { return; }
        this.sending = true;
        this.loaderService.showLoader();
        this.absentMessageService.postNewAbsentMessage(this.absentMessageForm.value)
            .subscribe((res: any) => {
                this.sending = false;
                this.loaderService.hideLoader();
                this.absentMessageService.addNewMessageToStore(res.data);
                this.absentMessageForm.reset();
                this.toastService.showSuccess('Address Created Successfully');

            }, (err: any) => {
                this.sending = false;
                this.loaderService.hideLoader();
                this.toastService.showError(err.msg);

            });
    }


}
