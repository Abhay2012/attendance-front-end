import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from '../../providers/address.service';


@Component({
    selector: 'app-addresses',
    templateUrl: './addresses.component.html',
    // styleUrls: ['./addresses.component.scss'],
})

export class AddressesComponent {


    addAddressForm: FormGroup;
    sending = false;

    constructor(
        private fb: FormBuilder,
        private addressService: AddressService

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
        console.log(this.addAddressForm.value);
        this.sending = true;
        this.addressService.addNewAddress(this.addAddressForm.value)
            .subscribe((res: any) => {
                console.log(res);

                this.addAddressForm.reset();
                this.sending = false;
                setTimeout(() => {
                    alert('Address created successfully');
                }, 200);

            }, (err: any) => {
                this.sending = false;
                setTimeout(() => {
                    alert('Some error occured');
                }, 200);
            });
    }


}
