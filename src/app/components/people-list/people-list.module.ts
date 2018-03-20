import { NgModule } from '@angular/core';
import { PeopleListComponent } from './people-list.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [ CommonModule],
    declarations: [
        PeopleListComponent,
    ],
    exports: [PeopleListComponent],
})

export class PeopleListModule {

}
