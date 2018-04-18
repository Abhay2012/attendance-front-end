import { NgModule } from '@angular/core';
import { PeopleListAdminComponent } from './people-list-admin.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, RouterModule,FormsModule],
    declarations: [
        PeopleListAdminComponent,
    ],
    exports: [PeopleListAdminComponent],
})

export class PeopleListAdminModule {

}
