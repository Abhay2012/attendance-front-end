import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { Address } from '../models/people';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators/tap';


@Injectable()
export class GroupService {


    groupStore: Array<any>;

    constructor(
        private customHttp: CustomHttpService,
    ) { }

    // postNewAddress(data: any) {
    //     return this.customHttp.post('/createAddress', data);

    // }

    // initializeAddressStore(data: Array<Address>) {
    //     this.addressStore = data;
    // }

    getGroupListForAdmin() {
        if (this.groupStore) {
            return of(this.groupStore);
        } else {

            return this.customHttp.get('/getGroups');
        }
    }

    getGroupListForAddress() {
        if (this.groupStore) {
            return of(this.groupStore);
        } else {

            return this.customHttp.get('/getGroupsForAddress');
        }
    }

    initializeGroupStore(grp:any){
        this.groupStore = grp;
    }

    getGroupById(id: number) {
        // in case of refresh, groupstore is undefined
        if (!this.groupStore) { return undefined; }

        return this.groupStore.find(g => g._id === id);
    }

   

    getDateList(gId: number) {

        return this.customHttp.get(`/getDates/:${gId}`);
    }

    // addNewAddressToStore(add: Address) {
    //     this.addressStore.unshift(add);
    // }

    // // code for deletion

    // deleteAddress(username: string) {
    //     return this.customHttp.delete(`/delete/:${username}`);
    // }

    // deleteAddressFromStore(index: number) {
    //     this.addressStore.splice(index, 1);
    // }

    // // code for edition

    // editAddress(data: any) {
    //     return this.customHttp.put('/update', data);
    // }

    // editAddressInStore(index: number, newData: Address) {
    //     this.addressStore.splice(index, 1, newData);
    // }



}
