import { Component, Input, Output, EventEmitter } from '@angular/core';
import { People } from '../../models/people';

@Component({
    selector: 'app-people-list',
    templateUrl: './people-list.component.html',
    styleUrls: ['./people-list.component.scss'],
})

export class PeopleListComponent {

    @Input() people: Array<People>;
    @Output() selectedPeople: EventEmitter<People> = new EventEmitter<People>();

    constructor(
    ) { }

    onPeopleSelect(p: People) {
        this.selectedPeople.emit(p);
    }
}
