import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from '../../providers/address.service';
import { Address } from '../../models/people';
import { ToastService } from '../../providers/toast.service';
import { LoaderService } from '../../providers/loader.service';

declare const $;

@Component({
    selector: 'app-addresses',
    templateUrl: './addresses.component.html',
    styleUrls: ['./addresses.component.scss'],
})

export class AddressesComponent implements OnInit {


    addressList: Address[];

    // code related to address edit 
    addressInModal: Address; // stores the address for whom edited btn has been pressed
    indexInModal: number; // stores the index of address for whom edited btn has been pressed
    editAddressForm: FormGroup;

    constructor(
        private addressService: AddressService,
        private toastService: ToastService,
        private fb: FormBuilder,
        private loaderService: LoaderService
    ) { }

    ngOnInit() {
        this.getAddressList();
        this.initEditForm();
    }

    getAddressList() {
        this.loaderService.showLoader();
        this.addressService.getAddressList()
            .subscribe((list: Address[]) => {
                this.loaderService.hideLoader();
                this.addressList = list;
                this.addressService.initializeAddressStore(list);
            }, (err: any) => {
                this.loaderService.hideLoader();                // show toast msg here
                this.toastService.showError(err.msg);
            });
    }

    onDelete(add: Address, index: number) {

        // take confirmation before deleting
        if (confirm('This address will be deleted !')) {
            this.loaderService.showLoader();
            this.addressService.deleteAddress(add.username)
                .subscribe((res: any) => {
                    this.loaderService.hideLoader();
                    this.addressService.deleteAddressFromStore(index);
                    this.toastService.showSuccess('Deleted Successfully');
                }, (err: any) => {
                    this.loaderService.hideLoader();
                    this.toastService.showError(err.msg);
                });
        }

    }

    onEdit(add: Address, index: number) {
        this.addressInModal = add;
        this.indexInModal = index;
        this.initEditForm(add);
        $('#editModal').modal('show');
    }

    initEditForm(add?: Address) {
        this.editAddressForm = this.fb.group({
            username: [add ? add.username : ''],
            address: [add ? add.address : '', Validators.required],
            password: [''],
        });
    }

    // getters for validtion errors
    get address() { return this.editAddressForm.get('address'); }
    get password() { return this.editAddressForm.get('password'); }

    onEditSubmit() {

        if (this.address.value.trim().length === 0) {
            alert('Address can not be empty');
            return;
        }
        // check if there is no change in the data
        const addressChanged = this.address.value.trim() !== this.addressInModal.address
            , pwdChanged = this.password.value.trim() !== '';

        if (!addressChanged && !pwdChanged) {
            alert('No information has been edited');
            return;
        }

        // construct the payload with username(mandatory) and only changed parameters
        const data: any = {
            username: this.addressInModal.username
        };
        if (addressChanged) {
            data['address'] = this.editAddressForm.value.address;
        }
        if (pwdChanged) {
            data['password'] = this.editAddressForm.value.password;
        }

        $('#editModal').modal('hide');

        // finally send the request
        this.sendEditRequest(data);

    }

    sendEditRequest(data: any) {
        this.loaderService.showLoader();
        this.addressService.editAddress(data)
            .subscribe((res: any) => {
                this.loaderService.hideLoader();
                this.addressService.editAddressInStore(this.indexInModal, {

                    _id: this.addressInModal._id,
                    username: data.username,
                    address: data.address || this.addressInModal.address,
                    password: data.password || this.addressInModal.password
                });
                this.toastService.showSuccess('Edited Successfully');
            }, (err: any) => {
                this.loaderService.hideLoader();
                this.toastService.showError(err.msg);
            });

    }


}
