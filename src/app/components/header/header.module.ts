import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { MainComponent } from '../../modules/main/main.component';
import { CommonModule } from '@angular/common';
import { AddressesComponent } from '../addresses/addresses.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        HeaderComponent,
    ],
    exports: [HeaderComponent],
})

export class HeaderModule {

}
