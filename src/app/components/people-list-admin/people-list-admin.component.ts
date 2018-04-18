import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { People } from '../../models/people';
import { GroupService } from '../../providers/group.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PeopleService } from '../../providers/people.service';
import { LoaderService } from '../../providers/loader.service';
import { ToastService } from '../../providers/toast.service';

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
    editedNote: string;
    isAddressOffice: boolean = JSON.parse(localStorage.getItem('role')) === 'teacher';

    constructor(
        private groupService: GroupService,
        private peopleService: PeopleService,
        private sanitizer: DomSanitizer,
        private loaderService: LoaderService,
        private toastService: ToastService

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

    onEditNoteBtn() {
        this.editedNote = this.clickedPerson.note;
        $('#attendanceDetailModal').modal('hide');
        $('#noteEditModal').modal('show');

    }

    onEdit() {
        if (this.editedNote.trim() === '') {
            this.toastService.showError('Note cannot be empty');
            return;
        }
        const cp = <any>this.clickedPerson;

        this.loaderService.showLoader();
        this.peopleService.editAbsentNote(this.grpAttendance._id, cp.id, this.editedNote)
            .subscribe((res: any) => {
                this.clickedPerson.note = this.editedNote;
                this.loaderService.hideLoader();
                this.toastService.showSuccess('Note updated successfully');
                $('#noteEditModal').modal('hide');

            }, (err: any) => {
                this.loaderService.hideLoader();
                this.toastService.showError(err.msg);
            });

    }
}
