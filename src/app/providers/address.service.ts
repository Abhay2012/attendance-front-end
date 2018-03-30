import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { Address } from '../models/people';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators/tap';


@Injectable()
export class AddressService {


    addressStore: Array<Address>;

    constructor(
        private customHttp: CustomHttpService,
    ) { }

    postNewAddress(data: any) {
        return this.customHttp.post('/createAddress', data);

    }

    initializeAddressStore(data: Array<Address>) {
        this.addressStore = data;
    }

    getAddressList() {
        if (this.addressStore) {
            return of(this.addressStore);
        } else {

            return this.customHttp.get('/getAddresses');
        }
    }

    addNewAddressToStore(add: Address) {
        this.addressStore.unshift(add);
    }

    // code for deletion

    deleteAddress(username: string) {
        return this.customHttp.delete(`/delete/${username}`);
    }

    deleteAddressFromStore(index: number) {
        this.addressStore.splice(index, 1);
    }

    // code for edition

    editAddress(data: any) {
        return this.customHttp.put('/update', data);
    }

    editAddressInStore(index: number, newData: Address) {
        this.addressStore.splice(index, 1, newData);
    }



}
