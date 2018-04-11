import { NgModule } from '@angular/core';
import { PeopleListComponent } from './people-list.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SwedishDatePipe } from '../../pipes/swedishDatePipe';

@NgModule({
    imports: [CommonModule, RouterModule,FormsModule],
    declarations: [
        PeopleListComponent,
        SwedishDatePipe
    ],
    exports: [PeopleListComponent],
})

export class PeopleListModule {

}
