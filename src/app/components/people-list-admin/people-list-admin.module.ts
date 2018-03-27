import { NgModule } from '@angular/core';
import { PeopleListAdminComponent } from './people-list-admin.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [
        PeopleListAdminComponent,
    ],
    exports: [PeopleListAdminComponent],
})

export class PeopleListAdminModule {

}
