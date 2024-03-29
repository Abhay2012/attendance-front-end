import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminMainComponent } from './admin-main.component';
import { FormsModule } from '@angular/forms';
import { PeopleListAdminModule } from '../people-list-admin/people-list-admin.module';

@NgModule({
    imports: [   
        CommonModule,
        FormsModule,
        RouterModule,
        PeopleListAdminModule
    ],
    declarations: [
        AdminMainComponent,
    ],
    exports: [AdminMainComponent],
})

export class AdminMainModule {

}
