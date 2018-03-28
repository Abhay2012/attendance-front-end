import { Component, OnInit } from '@angular/core';
import { People } from '../../models/people';
import { PeopleService } from '../../providers/people.service';
import { ToastService } from '../../providers/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupService } from '../../providers/group.service';
import { LoaderService } from '../../providers/loader.service';

declare const $;

@Component({
    selector: 'app-people-list',
    templateUrl: './people-list.component.html',
    styleUrls: ['./people-list.component.scss'],
})

export class PeopleListComponent implements OnInit {

    peopleList: Array<People>;
    group: any;
    absentNote: string;
    absentNoteStudent: any;

    constructor(
        private peopleService: PeopleService,
        private toastService: ToastService,
        private loaderService: LoaderService,
        private router: Router,
        private route: ActivatedRoute,
        private groupService: GroupService
    ) { }

    ngOnInit() {

        this.route.params.subscribe((params: any) => {

            const grpId: string = params['id'];
            // if (this.groupService.getGroupById(grpId)) {
            //     this.group = this.groupService.getGroupById(grpId);
            //     this.peopleList = this.group.students;
            //     this.peopleService.peopleList = this.peopleList;
            // } else {
            //     this.router.navigate(['../../'], { relativeTo: this.route });
            // }

            this.getAttendance(grpId);


        });

    }

    giveCorrectIsoTime() {
        const tzoffset = (new Date()).getTimezoneOffset() * 60000; // offset in milliseconds
        return (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);

    }

    getAttendance(gId: string) {

        const d = this.giveCorrectIsoTime();

        this.loaderService.showLoader();
        this.groupService.getGroupAttendace(gId, d)
            .subscribe((res: any) => {
                this.loaderService.hideLoader();
                this.group = res[0];
                this.groupService.grpAttendance = res;
                this.peopleList = this.group.students;
                this.peopleService.peopleList = this.peopleList;
                // this.groupService.grpAttendance = res[0];
                // if (res[0].attendance) {
                //     this.groupService.grpAttendance = res[0];
                //     this.router.navigate([`/app/main/groupInfo`]);

                // } else {
                //     this.groupService.grpAttendance = res[0];
                //     this.router.navigate([`/app/main/group/${this.selectedGroup._id}`]);
                // }
            }, (err: any) => {
                this.loaderService.hideLoader();
                this.toastService.showError(err.msg);
            });

    }

    onPeopleSelect(p: People) {
        this.peopleService.clickedPerson = p;
        this.router.navigate(['signature2'], { relativeTo: this.route });

    }

    onMarkAbsent(ev: any, stud: any) {
        ev.stopPropagation();
        ev.preventDefault();
        $('#markAbsentModal').modal('show');
        this.absentNoteStudent = stud;
    }

    onMarkAbsentDone() {
        console.log(this.absentNote);
        $('#markAbsentModal').modal('hide');
        if (this.absentNote && this.absentNote.trim() !== '') {
            this.absentNoteStudent.present = false;
            this.absentNoteStudent.note = this.absentNote;
        }
    }

    onUploadAttendance() {

        $('#attendanceSubmitModal').modal('show');
    }

    onSubmitCancel() {
        $('#attendanceSubmitModal').modal('hide');

    }

    finallyUpload() {
        $('#attendanceSubmitModal').modal('hide');

        let data: any = {};
        data.group_id = this.group._id;
        data.group_name = this.group.group_name;
        data.date = this.giveCorrectIsoTime();

        data.attendance = this.peopleService.peopleList.map((p: any) => {

            let a: any = {
                name: p.name,
                id: p._id,
                present: p.present || false,
            };

            if (a.present) {
                a.sign = p.sign ? p.sign.changingThisBreaksApplicationSecurity : 'ABSENT NOTE';

            } else {
                a.note = p.note;
            }

            return a;


        });

        this.loaderService.showLoader();
        this.peopleService.uploadGroupAttendance(data)
            .subscribe((res: any) => {
                this.loaderService.hideLoader();
                this.toastService.showSuccess('Attendance saved successfuly');
            }, (err: any) => {
                this.toastService.showError(err.msg);
                this.loaderService.hideLoader();
            });
    }

    routeBack() {
        // this.router.navigate(['/app/main']);
        this.goBackFinally();
    }

    goBackFinally() {
        this.groupService.grpAttendance = null;
        this.peopleService.peopleList = null;
        this.router.navigate(['/app/main']);

    }


}
