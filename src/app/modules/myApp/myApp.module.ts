import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { HeaderModule } from '../../components/header/header.module';
import { PeopleListModule } from '../../components/people-list/people-list.module';
import { PeopleService } from '../../providers/people.service';
import { AddressesComponent } from '../../components/addresses/addresses.component';
import { MainComponent } from '../main/main.component';
import { MyAppComponent } from './myApp.component';
import { SignatureModule } from '../../components/signature/signature.module';
import { Signature2Component } from '../../components/signature-diff/signature2.component';
import { CommonModule } from '@angular/common';
import { ShowErrorsModule } from '../../components/show-errors/show-errors.module';
import { AddressService } from '../../providers/address.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateAddressComponent } from '../../components/createAddress/createAddress..component';
import { LoaderService } from '../../providers/loader.service';

@NgModule({
    imports: [
        CommonModule,
        HeaderModule,
        PeopleListModule,
        SignatureModule,
        ShowErrorsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: MyAppComponent,
                children: [

                    {
                        path: 'main',
                        component: MainComponent
                    },
                    {
                        path: 'signature2',
                        component: Signature2Component
                    },
                    {
                        path: 'addresses',
                        component: AddressesComponent
                        // add guard to this component
                    },
                    {
                        path: 'addresses/create',
                        component: CreateAddressComponent
                        // add guard to this component
                    },
                    {
                        path: '',
                        redirectTo: 'main',
                        pathMatch: 'full'
                    }
                ]
            }

        ])

    ],
    exports: [],
    declarations: [
        AddressesComponent,
        CreateAddressComponent,
        MainComponent,
        MyAppComponent,
        Signature2Component
    ],
    providers: [
        PeopleService,
        AddressService,
        LoaderService
    ]
})

export class MyAppModule {

}
