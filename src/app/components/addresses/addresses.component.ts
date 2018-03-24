import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from '../../providers/address.service';
import { Address } from '../../models/people';
import { ToastService } from '../../providers/toast.service';


@Component({
    selector: 'app-addresses',
    templateUrl: './addresses.component.html',
    styleUrls: ['./addresses.component.scss'],
})

export class AddressesComponent implements OnInit {


    addressList: Address[];
    loader = false;

    constructor(
        private addressService: AddressService,
        private toastService: ToastService
    ) { }

    ngOnInit() {
        this.getAddressList();
    }

    getAddressList() {
        this.loader = true;
        this.addressService.getAddressList()
            .subscribe((list: Address[]) => {
                this.addressList = list;
                this.loader = false;
                this.addressService.initializeAddressStore(list);
            }, (err: any) => {
                this.loader = false;
                // show toast msg here
                this.toastService.showError(err.msg);
            });
    }

    onEdit(add: Address, index: number) {

    }

    onDelete(add: Address, index: number) {

        if (confirm('This address will be deleted !')) {
            this.addressService.deleteAddress(add.username)
                .subscribe((res: any) => {
                    this.addressService.deleteAddressFromStore(index);
                    this.toastService.showSuccess('Deleted Successfully');
                }, (err: any) => {
                    this.toastService.showError(err.msg);
                });
        }

    }

}
