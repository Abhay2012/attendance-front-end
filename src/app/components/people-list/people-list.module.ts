import { NgModule } from '@angular/core';
import { PeopleListComponent } from './people-list.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, RouterModule,FormsModule],
    declarations: [
        PeopleListComponent,
    ],
    exports: [PeopleListComponent],
})

export class PeopleListModule {

}
