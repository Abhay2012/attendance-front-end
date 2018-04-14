import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { HeaderModule } from '../../components/header/header.module';
import { PeopleListModule } from '../../components/people-list/people-list.module';
import { PeopleService } from '../../providers/people.service';
import { AddressesComponent } from '../../components/addresses/addresses.component';
import { MainComponent } from '../main/main.component';
import { MyAppComponent } from './myApp.component';
import { Signature2Component } from '../../components/signature-diff/signature2.component';
import { CommonModule } from '@angular/common';
import { ShowErrorsModule } from '../../components/show-errors/show-errors.module';
import { AddressService } from '../../providers/address.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateAddressComponent } from '../../components/createAddress/createAddress.component';
import { LoaderService } from '../../providers/loader.service';
import { AdminMainModule } from '../../components/admin-main/admin-main.module';
import { GroupService } from '../../providers/group.service';
import { GroupListForAddressModule } from '../../components/group-list-address/group-list-address.module';
import { PeopleListComponent } from '../../components/people-list/people-list.component';
import { OtherMainModule } from '../../components/other-main/other-main.module';
import { PeopleListAdminModule } from '../../components/people-list-admin/people-list-admin.module';
import { PeopleListAdminComponent } from '../../components/people-list-admin/people-list-admin.component';
import { UploadStudentsComponent } from '../../components/upload-students/upload-students.component';
import { PreviousAttendanceComponent } from '../../components/previous-attendance/previous-attendance.component';
import { CreateTeacherComponent } from '../../components/createTeacher/createTeacher..component';
import { TeachersComponent } from '../../components/teachers/teachers.component';
import { AbsentMessagesComponent } from '../../components/absentMessages/absentMessages.component';
import { AbsentMessageService } from '../../providers/absent-message.service';
import { CreateAbsentMessageComponent } from '../../components/createAbsentMessage/createMessage.component';
// import { SwedishDatePipe } from '../../pipes/swedishDatePipe';

@NgModule({
    imports: [
        CommonModule,
        HeaderModule,
        PeopleListModule,
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
                    {
                        path: 'main/group/:id',
                        children: [
                            {
                                path: 'signature2',
                                component: Signature2Component
                            },
                            {
                                path: '',
                                component: PeopleListComponent,
                            }
                        ]
                        // add guard to this component
                    },
                    {
                        path: 'addresses',
                        children: [
                            {
                                path: 'create',
                                component: CreateAddressComponent
                            },
                            {
                                path: '',
                                component: AddressesComponent,
                            }
                        ]
                        // add guard to this component
                    },
                    {
                        path: 'teachers',
                        children: [
                            {
                                path: 'create',
                                component: CreateTeacherComponent
                            },
                            {
                                path: '',
                                component: TeachersComponent,
                            }
                        ]
                        // add guard to this component
                    },
                    {
                        path: 'absentMessages',
                        children: [
                            {
                                path: 'create',
                                component: CreateAbsentMessageComponent
                            },
                            {
                                path: '',
                                component: AbsentMessagesComponent,
                            }
                        ]
                        // add guard to this component
                    },
                    {
                        path: 'previousAttendance',
                        component: PreviousAttendanceComponent
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
        CreateTeacherComponent,
        TeachersComponent,
        MainComponent,
        MyAppComponent,
        Signature2Component,
        UploadStudentsComponent,
        PreviousAttendanceComponent,
        AbsentMessagesComponent,
        CreateAbsentMessageComponent
        // SwedishDatePipe
    ],
    providers: [
        PeopleService,
        AddressService,
        GroupService,
        LoaderService,
        AbsentMessageService
    ]
})

export class MyAppModule {

}
