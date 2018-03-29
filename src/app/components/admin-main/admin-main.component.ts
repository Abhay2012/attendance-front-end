import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from '../../providers/group.service';
import { LoaderService } from '../../providers/loader.service';
import { ToastService } from '../../providers/toast.service';

@Component({
    selector: 'app-admin-main',
    templateUrl: './admin-main.component.html',
    styleUrls: ['./admin-main.component.scss']
})

export class AdminMainComponent implements OnInit {

    groups: Array<any>;
    dates: Array<{ date: string }>;
    isAdmin = JSON.parse(localStorage.getItem('username')) === 'admin';

    // ngModal variables
    selectedGroup: any;
    selectedDate: string;

    grpAttendance: Array<any>;
    grpDetailInfo: any;  // without the attenance

    constructor(
        private router: Router,
        private groupService: GroupService,
        private loaderService: LoaderService,
        private toastService: ToastService
    ) {
    }

    ngOnInit() {

        this.getGroups();
    }



    getGroups() {

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
        this.grpDetailInfo = null;
        this.grpAttendance = null;
        this.getDates();
        this.getGroupInfoById();
    }

    getDates() {

        this.loaderService.showLoader();
        this.groupService.getDateList(this.selectedGroup._id)
            .subscribe((res: Array<any>) => {
                this.dates = res;
                this.selectedDate = null;
                this.loaderService.hideLoader();

            }, (err: any) => {
                this.loaderService.hideLoader();
                this.toastService.showError(err.msg);
            });
    }


    // fetches only the group's student name and other basic info
    getGroupInfoById() {
        this.loaderService.showLoader();
        this.groupService.getGroupById(this.selectedGroup._id)
            .subscribe((res: any) => {
                this.grpDetailInfo = res;
                this.loaderService.hideLoader();

            }, (err: any) => {
                this.loaderService.hideLoader();
                this.toastService.showError(err.msg);
            });
    }

    onDateChange() {
        console.log(this.selectedDate);
        this.grpAttendance = null;
        this.grpDetailInfo = null;
        this.getGrpAttendance();
    }

    getGrpAttendance() {
        console.log('loader start before grp attendance');

        this.loaderService.showLoader();
        this.groupService.getGroupAttendace(this.selectedGroup._id, this.selectedDate)
            .subscribe((res: any) => {
                console.log('loader hide after grp attendance');

                this.loaderService.hideLoader();
                this.grpAttendance = res;

            }, (err: any) => {
                this.loaderService.hideLoader();
                this.toastService.showError(err.msg);
            });
    }

    onGrpInfoBtn() {
        this.grpDetailInfo = null;
        this.grpAttendance = null;
        this.getGroupInfoById();
    }

    onGrpAttendanceBtn() {
        this.grpDetailInfo = null;
        this.grpAttendance = null;
        this.getGrpAttendance();
    }

}
