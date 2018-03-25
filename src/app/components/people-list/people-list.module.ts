import { NgModule } from '@angular/core';
import { PeopleListComponent } from './people-list.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [
        PeopleListComponent,
    ],
    exports: [PeopleListComponent],
})

export class PeopleListModule {

}
