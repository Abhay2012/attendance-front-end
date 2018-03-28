import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from '../../providers/group.service';
import { LoaderService } from '../../providers/loader.service';
import { ToastService } from '../../providers/toast.service';

@Component({
    selector: 'app-other-main',
    templateUrl: './other-main.component.html',
    styleUrls: ['./other-main.component.scss']
})

export class OtherMainComponent implements OnInit {

    groups: Array<any>;
    // dates: Array<{ date: string }>;

    // ngModal variables
    selectedGroup: any;
    // selectedDate: any;

    constructor(
        private router: Router,
        private groupService: GroupService,
        private loaderService: LoaderService,
        private toastService: ToastService
    ) {
        // this.dates = [{ date: this.giveCorrectIsoTime() }];
    }

    // giveCorrectIsoTime() {
    //     const tzoffset = (new Date()).getTimezoneOffset() * 60000; // offset in milliseconds
    //     return (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);

    // }

    ngOnInit() {
        this.getGroups();
    }

    getGroups() {
        console.log('get groups called////');

        this.loaderService.showLoader();
        this.groupService.getGroupList()
            .subscribe((res: any) => {
                this.groups = res.groups;
                this.loaderService.hideLoader();
            }, (err: any) => {
                this.loaderService.hideLoader();
                this.toastService.showError(err.msg);
            });
    }

    onGroupChange() {
        console.log(this.selectedGroup);
        // this.selectedDate = null;
        // this.dates = [{ date: this.giveCorrectIsoTime() }];
        // this.getDates();
    }

    // getDates() {

    //     this.loaderService.showLoader();
    //     this.groupService.getDateList(this.selectedGroup._id)
    //         .subscribe((res: any) => {
    //             if (res.date !== this.dates[0].date) {
    //             this.dates = this.dates.concat(res);
    //         }
    //             this.loaderService.hideLoader();

    //         }, (err: any) => {
    //             this.loaderService.hideLoader();
    //             this.toastService.showError(err.msg);
    //         });
    // }

    // onDateChange() {
    //     console.log(this.selectedDate);
    // }

    // onSubmit() {
    //     if (!this.selectedGroup) {
    //         this.toastService.showError('Please select a group');
    //         return;
    //     }
    //     if (!this.selectedDate) {
    //         this.toastService.showError('Please select a date');
    //         return;
    //     }

    //     this.getAttendance();

    // }

    onSubmit() {
        console.log('get groups called////', this.selectedGroup._id);

        this.router.navigate([`/app/main/group/${this.selectedGroup._id}`]);
    }

    // getAttendance() {

    //     this.loaderService.showLoader();
    //     this.groupService.getGroupAttendace(this.selectedGroup._id, this.selectedDate.date)
    //         .subscribe((res: any) => {
    //             this.loaderService.hideLoader();
    //             this.groupService.grpAttendance = res[0];
    //             if (res[0].attendance) {
    //                 this.groupService.grpAttendance = res[0];
    //                 this.router.navigate([`/app/main/groupInfo`]);

    //             } else {
    //                 this.groupService.grpAttendance = res[0];
    //                 this.router.navigate([`/app/main/group/${this.selectedGroup._id}`]);
    //             }
    //         }, (err: any) => {
    //             this.loaderService.hideLoader();
    //             this.toastService.showError(err.msg);
    //         });

    // }

}
