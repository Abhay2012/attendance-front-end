import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from '../../models/people';
import { AddressService } from '../../providers/address.service';
declare const $;
@Component({
    selector: 'app-address-list',
    templateUrl: './address-list.component.html',
    styleUrls: ['./address-list.component.scss'],
})

export class AddressListComponent {

@Input() addresses: Address[];
    constructor(
        private router: Router,
        private addressService:AddressService
    ) {
     
    }

}
