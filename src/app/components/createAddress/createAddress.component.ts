import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from '../../providers/address.service';
import { ToastService } from '../../providers/toast.service';
import { LoaderService } from '../../providers/loader.service';


@Component({
    selector: 'app-create-address',
    templateUrl: './createAddress.component.html',
    // styleUrls: ['./create-address.component.scss'],
})

export class CreateAddressComponent {


    addAddressForm: FormGroup;
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
        this.addAddressForm = this.fb.group({
            address: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    get address() {
        return this.addAddressForm.get('address');
    }
    get username() {
        return this.addAddressForm.get('username');
    }
    get password() {
        return this.addAddressForm.get('password');
    }

    onSubmit() {
        if (this.sending) { return; }
        this.sending = true;
        this.loaderService.showLoader();
        this.addressService.postNewAddress(this.addAddressForm.value)
            .subscribe((res: any) => {
                this.sending = false;
                this.addAddressForm.reset();
                this.loaderService.hideLoader();
                this.addressService.addNewAddressToStore(res.data);
                this.toastService.showSuccess('Address Created Successfully');

            }, (err: any) => {
                this.sending = false;
                this.loaderService.hideLoader();
                this.toastService.showError(err.msg);

            });
    }


}
