import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { Address, Teacher } from '../models/people';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators/tap';


@Injectable()
export class AddressService {


    addressStore: Array<Address | Teacher>;
    teacherStore: Array<Address | Teacher>;

    role:string; // specifies either 'address' or 'teacher', set from the addressesComponent and TeachersComponent

    constructor(
        private customHttp: CustomHttpService,
    ) { }


    postNewAddress(data: any) {
        return this.customHttp.post(`/create/${this.role}`, data);

    }

    initializeAddressStore(data: Array<Address | Teacher>) {
        this.role === 'address' ? this.addressStore = data : this.teacherStore = data;
    }

    getAddressList() {
        if (this.role === 'address' && this.addressStore) {
            return of(this.addressStore);
        } else if (this.role === 'teacher' && this.teacherStore) {
            return of(this.teacherStore);
        } else {
            return this.customHttp.get(`/getUsers/${this.role}`);
        }
    }

    addNewAddressToStore(add: Address | Teacher) {
        this.role === 'address' ? this.addressStore.unshift(add) : this.teacherStore.unshift(add);
    }

    // code for deletion

    deleteAddress(username: string) {
        return this.customHttp.delete(`/delete/${username}`);
    }

    deleteAddressFromStore(index: number) {
        this.role === 'address' ? this.addressStore.splice(index, 1) : this.teacherStore.splice(index, 1);


    }

    // code for edition

    editAddress(data: any) {
        return this.customHttp.put('/update', data);
    }

    editAddressInStore(index: number, newData: Address | Teacher) {
        this.role === 'address' ? this.addressStore.splice(index, 1, newData)
            : this.teacherStore.splice(index, 1, newData);
    }



}
