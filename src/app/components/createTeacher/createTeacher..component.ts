import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from '../../providers/address.service';
import { ToastService } from '../../providers/toast.service';
import { LoaderService } from '../../providers/loader.service';


@Component({
    selector: 'app-create-teacher',
    templateUrl: './createTeacher.component.html',
    // styleUrls: ['./create-address.component.scss'],
})


// teacher refers to address office which has the same functionality as teacher
// earlier their was the option of teacher which now has been used for office address

export class CreateTeacherComponent {


    addTeacherForm: FormGroup;
    sending = false; // to handle the submit btn press repeatedly

    constructor(
        private fb: FormBuilder,
        private addressService: AddressService,
        private toastService: ToastService,
        private loaderService: LoaderService

    ) {
        this.initForm();
    }

    initForm() {
        this.addTeacherForm = this.fb.group({
            teacher: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    get teacher() {
        return this.addTeacherForm.get('teacher');
    }
    get username() {
        return this.addTeacherForm.get('username');
    }
    get password() {
        return this.addTeacherForm.get('password');
    }

    onSubmit() {
        if (this.sending) { return; }
        this.sending = true;
        this.loaderService.showLoader();
        this.addressService.postNewAddress(this.addTeacherForm.value)
            .subscribe((res: any) => {
                this.sending = false;
                this.addTeacherForm.reset();
                this.loaderService.hideLoader();
                this.addressService.addNewAddressToStore(res.data);
                this.toastService.showSuccess('Handledare Created Successfully');

            }, (err: any) => {
                this.sending = false;
                this.loaderService.hideLoader();
                this.toastService.showError(err.msg);

            });
    }


}
