import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GroupListForAddressComponent } from './group-list-address.component';

@NgModule({
    imports: [   
        CommonModule,
        RouterModule
    ],
    declarations: [
        GroupListForAddressComponent,
    ],
    exports: [GroupListForAddressComponent],
})

export class GroupListForAddressModule {

}
