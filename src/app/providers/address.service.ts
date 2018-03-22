import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';


@Injectable()
export class AddressService {

    constructor(
        private customHttp: CustomHttpService,
        //   private toast: MyToastService
    ) { }

    addNewAddress(data: any) {
        return this.customHttp.post('/createAddress', data);

    }

    getAddressList() {
        return this.customHttp.get('/getAddresses');
    }
}
