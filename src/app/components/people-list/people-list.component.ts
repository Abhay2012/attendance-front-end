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

    constructor(
        private peopleService: PeopleService,
        private toastService: ToastService,
        private laoderService: LoaderService,
        private router: Router,
        private route: ActivatedRoute,
        private groupService: GroupService
    ) { }

    ngOnInit() {

        this.route.params.subscribe((params: any) => {

            const grpId: number = params['id'];
            if (this.groupService.getGroupById(grpId)) {
                this.group = this.groupService.getGroupById(grpId);
                this.peopleList = this.group.students;
                this.peopleService.peopleList = this.peopleList;
            } else {
                this.router.navigate(['../../'], { relativeTo: this.route });
            }


        });

    }

    onPeopleSelect(p: People) {
        this.peopleService.clickedPerson = p;
        this.router.navigate(['signature2'], { relativeTo: this.route });

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

        data.attendance = this.peopleService.peopleList.map((p: People) => {

            return {
                name: p.name,
                id: p._id,
                present: p.signed || false,
                sign: p.signature ? p.signature.changingThisBreaksApplicationSecurity : 'ABSENT NOTE'
            };
        });

        this.laoderService.showLoader();
        this.peopleService.uploadGroupAttendance(data)
            .subscribe((res: any) => {
                this.laoderService.hideLoader();
                this.toastService.showSuccess('Attendance saved successfuly');
            }, (err: any) => {
                this.toastService.showError(err.msg);
                this.laoderService.hideLoader();
            });
    }

    giveCorrectIsoTime() {
        const tzoffset = (new Date()).getTimezoneOffset() * 60000; // offset in milliseconds
        return (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);

    }
}
