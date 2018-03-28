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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateAddressComponent } from '../../components/createAddress/createAddress..component';
import { LoaderService } from '../../providers/loader.service';
import { AdminMainModule } from '../../components/admin-main/admin-main.module';
import { GroupService } from '../../providers/group.service';
import { GroupListForAddressModule } from '../../components/group-list-address/group-list-address.module';
import { PeopleListComponent } from '../../components/people-list/people-list.component';
import { OtherMainModule } from '../../components/other-main/other-main.module';
import { PeopleListAdminModule } from '../../components/people-list-admin/people-list-admin.module';
import { PeopleListAdminComponent } from '../../components/people-list-admin/people-list-admin.component';
import { UploadStudentsComponent } from '../../components/upload-students/upload-students.component';

@NgModule({
    imports: [
        CommonModule,
        HeaderModule,
        PeopleListModule,
        SignatureModule,
        AdminMainModule,
        OtherMainModule,
        PeopleListAdminModule,
        GroupListForAddressModule,
        ShowErrorsModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: MyAppComponent,
                children: [

                    {
                        path: 'main',
                        component: MainComponent
                    },
                    // {
                    //     path: 'main/signature2',
                    //     component: Signature2Component
                    // },
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
                        path: 'main/group/:id',
                        children: [
                            {
                                path: 'signature2',
                                component: Signature2Component
                            },
                            {
                                path: '',
                                component: PeopleListComponent
                            }
                        ]
                        // add guard to this component
                    },
                    {
                        path: 'main/groupInfo',
                        component: PeopleListAdminComponent
                    },

                    {
                        path: 'uploadStudents',
                        component: UploadStudentsComponent
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
        Signature2Component,
        UploadStudentsComponent
    ],
    providers: [
        PeopleService,
        AddressService,
        GroupService,
        LoaderService
    ]
})

export class MyAppModule {

}
