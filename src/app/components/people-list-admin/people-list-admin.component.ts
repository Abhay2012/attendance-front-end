import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { People } from '../../models/people';
import { GroupService } from '../../providers/group.service';
import { DomSanitizer } from '@angular/platform-browser';

declare const $;

@Component({
    selector: 'app-people-list-admin',
    templateUrl: './people-list-admin.component.html',
    styleUrls: ['./people-list-admin.component.scss'],
})

export class PeopleListAdminComponent implements OnInit, OnChanges {

    @Input() grpAttendance: any;
    // group: any;
    clickedPerson: People;
    clickedPersonSign: string;

    constructor(
        private groupService: GroupService,
        private sanitizer: DomSanitizer

    ) { }

    ngOnChanges() {

        this.grpAttendance = this.grpAttendance[0];
    }

    ngOnInit() { }

    onPeopleSelect(p: People) {
        this.clickedPerson = p;
        this.clickedPersonSign = this.giveSanitizedImageUrl(this.clickedPerson.sign);
        $('#attendanceDetailModal').modal('show');

    }

    giveSanitizedImageUrl(url: string) {
        return <string>this.sanitizer.bypassSecurityTrustUrl(url)
    }
}
