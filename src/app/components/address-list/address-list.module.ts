import { NgModule } from '@angular/core';
import { AddressListComponent } from './address-list.component';
import { RouterModule } from '@angular/router';
import { MainComponent } from '../../modules/main/main.component';
import { CommonModule } from '@angular/common';
// import { AddressesComponent } from '../addresses/addresses.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        AddressListComponent
    ],
    exports: [AddressListComponent]
})

export class AddressListModule {

}
