import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { People } from '../../models/people';
import { GroupService } from '../../providers/group.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PeopleService } from '../../providers/people.service';
import { LoaderService } from '../../providers/loader.service';
import { ToastService } from '../../providers/toast.service';
import { Router } from '@angular/router';

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
    local;
    addedNote = ''; // used when a present student is changed to absent

    selectedStudentToDelete: any; // for storing the student whose deelte btn is pressed


    constructor(
        private groupService: GroupService,
        private peopleService: PeopleService,
        private sanitizer: DomSanitizer,
        private loaderService: LoaderService,
        private toastService: ToastService,
        private router: Router

    ) { }

    ngOnChanges() {

        this.grpAttendance = this.grpAttendance[0];
    }

    ngOnInit() {
        this.local = localStorage;
     }

    onPeopleSelect(p: People) {
        this.clickedPerson = p;
        this.clickedPersonSign = this.giveSanitizedImageUrl(this.clickedPerson.sign);
        $('#attendanceDetailModal').modal('show');

    }

    giveSanitizedImageUrl(url: string) {
        return <string>this.sanitizer.bypassSecurityTrustUrl(url);
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

    onChangeToAbsent() {
        $('#attendanceDetailModal').modal('hide');
        $('#noteAddModal').modal('show');

    }

    onAddNote() {
        if (this.addedNote.trim() === '') {
            this.toastService.showError('Note cannot be empty');
            return;
        }
        const cp = <any>this.clickedPerson;

        // make new student object with updated attendance details
        const newData: any = {
            id: cp.id,
            name: cp.name,
            present: false,
            note: this.addedNote
        };

        const data: any = {
            _id: this.grpAttendance._id,
            data: newData
        };

        this.loaderService.showLoader();
        this.peopleService.changeAttendancStatus(data)
            .subscribe((res: any) => {
                this.clickedPerson.note = this.addedNote;
                this.clickedPerson.present = false;
                if (this.clickedPerson.sign) { delete this.clickedPerson.sign; }
                this.loaderService.hideLoader();
                this.toastService.showSuccess('Attendance changed successfully');
                $('#noteAddModal').modal('hide');

            }, (err: any) => {
                this.loaderService.hideLoader();
                this.toastService.showError(err.msg);
            });
    }


    onChangeToPresent() {
        $('#attendanceDetailModal').modal('hide');
        $('#changeToPresentModal').modal('show');
    }

    onTakeSignature() {
        $('#changeToPresentModal').modal('hide');

        this.peopleService.clickedPerson = this.clickedPerson;
        this.peopleService.groupName = this.grpAttendance.group_name;
        this.peopleService.attendanceId = this.grpAttendance._id;
        const grpId: string = this.grpAttendance.group_id; //  just for routing to signature component
        this.router.navigate([`/app/main/group/${grpId}/signature2`]);
    }


    onNoSignature() {
        const cp = <any>this.clickedPerson;
        // make new student object with updated attendance details
        const newData: any = {
            id: cp.id,
            name: cp.name,
            present: true,
            sign: ''
        };

        const data: any = {
            _id: this.grpAttendance._id,
            data: newData
        };

        this.loaderService.showLoader();
        this.peopleService.changeAttendancStatus(data)
            .subscribe((res: any) => {
                this.clickedPerson.sign = '';
                this.clickedPerson.present = true;
                if (this.clickedPerson.note) { delete this.clickedPerson.note; }
                this.loaderService.hideLoader();
                this.toastService.showSuccess('Attendance changed successfully');
                $('#changeToPresentModal').modal('hide');

            }, (err: any) => {
                this.loaderService.hideLoader();
                this.toastService.showError(err.msg);
            });
    }


    // methods related to deletion
    onStudentDelete2(ev: any, student: any) {
        ev.preventDefault();
        ev.stopPropagation();
        console.log(this.grpAttendance._id);
        console.log(student);
        this.selectedStudentToDelete = student;
        $('#studentDeletionmodal').modal('show');
    }

    finallyDeleteStudent2() {

        this.loaderService.showLoader();
        this.groupService.deleteStudentFromAttendance(this.grpAttendance._id, this.selectedStudentToDelete.id)
            .subscribe((res: any) => {
                this.loaderService.hideLoader();
                $('#studentDeletionmodal').modal('hide');
                this.removeDeletedStudentFromList2();

            }, (err: any) => {
                this.loaderService.hideLoader();
                this.toastService.showError(err.msg);
            });
    }

    removeDeletedStudentFromList2() {
        const i = this.grpAttendance.attendance.findIndex(s => s.id == this.selectedStudentToDelete.id);
        if (i > -1) {
            this.grpAttendance.attendance.splice(i, 1);
            this.selectedStudentToDelete = null;
        }
    }
}
