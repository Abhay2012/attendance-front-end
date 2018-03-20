import { Component, Input } from '@angular/core';
import { People } from '../../models/people';

@Component({
    selector: 'app-people-list',
    templateUrl: './people-list.component.html',
    styleUrls: ['./people-list.component.scss'],
})

export class PeopleListComponent {

    @Input() peoples: Array<People>;

    constructor(
    ) { }


}
