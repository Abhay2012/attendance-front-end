import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from '../../providers/group.service';
import { LoaderService } from '../../providers/loader.service';
import { ToastService } from '../../providers/toast.service';
import { DomSanitizer } from '@angular/platform-browser';
declare const $;

@Component({
    selector: 'app-admin-main',
    templateUrl: './admin-main.component.html',
    styleUrls: ['./admin-main.component.scss']
})

export class AdminMainComponent implements OnInit {

    grpAttendanceCopy: any;
    groups: Array<any>;
    dates: Array<{ date: string }>;
    isAdmin = JSON.parse(localStorage.getItem('username')) === 'admin';

    // ngModal variables
    selectedGroup: any;
    selectedDate: any;

    // below varibles are for showing the attendance record of particular student
    selectedStudent: any; // for storing the student whose attendance record is being viewed in modal
    selectedStudentAttendance: Array<any>;
    selectedStudentDateRecord: any; // stores the object containing the record for a particular date of selectedStudent
    selectedStudentDateSign: string;

    selectedStudentToDelete: any; // for storing the student whose deelte btn is pressed


    grpAttendance: Array<any>;
    grpDetailInfo: any;  // without the attendance

    constructor(
        private router: Router,
        private groupService: GroupService,
        private loaderService: LoaderService,
        private toastService: ToastService,
        private sanitizer: DomSanitizer

    ) {
    }

    ngOnInit() {

        this.getGroups();
        this.groupService.grpAttendance = null; // to remove a bug in which grpAttendance in service 
        // is not cleared when
        // routeed away from people-list-component, duw to which fresh attendance is nt fetched 
        // in current(AdminMainComponent) component
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
        // console.log(this.selectedGroup);
        

        this.grpDetailInfo = null;
        this.grpAttendance = null;
        this.getDates();
        this.getGroupInfoById();
    }

    getDates() {

        this.loaderService.showLoader();
        this.groupService.getDateList(this.selectedGroup._id)
            .subscribe((res: Array<any>) => {
                this.selectedDate = null;
                this.dates = res;
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
        // console.log('loader start before grp attendance');

        this.loaderService.showLoader();
        this.groupService.getGroupAttendace(this.selectedGroup._id, this.selectedDate.date)
            .subscribe((res: any) => {
                // console.log('loader hide after grp attendance');

                this.loaderService.hideLoader();
                this.grpAttendance = res;
                this.grpAttendanceCopy = JSON.parse(JSON.stringify(this.grpAttendance));

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

    // BELOW CODE RELATED TO FETCH ATTENDACE RECORD OF A PARTICULAR STUDENT

    onStudentSelect(student: any) {
        this.loaderService.showLoader();
        this.groupService.getAttendanceByStudentId(student._id).
            subscribe((res: any) => {
                this.loaderService.hideLoader();
                this.selectedStudent = student;
                this.selectedStudentAttendance = res.data;

                $('#attendanceRecordModal').modal('show');

            }, (err: any) => {
                this.loaderService.hideLoader();
                this.toastService.showError(err.msg);
            });
    }

    onAttendanceRecordModalClose() {
        $('#attendanceRecordModal').modal('hide');

        this.selectedStudent = null;
        this.selectedStudentAttendance = null;
    }

    onAttendanceRecordSelect(attendanceRecord: any) {
        this.selectedStudentDateRecord = attendanceRecord;
        this.selectedStudentDateSign = <string>this.sanitizer.bypassSecurityTrustUrl(this.selectedStudentDateRecord.attendance.sign);
        $('#viewSignmodal').modal('show');

    }

    filterBy(ev) {
        this.grpAttendance = JSON.parse(JSON.stringify(this.grpAttendanceCopy));
        if (ev.target.value == 'present') {
            this.grpAttendance[0].attendance = this.grpAttendance[0]['attendance'].filter(value => value.present);
        } else if (ev.target.value == 'absent') {
            this.grpAttendance[0].attendance = this.grpAttendance[0]['attendance'].filter(value => !value.present);
        }
        this.grpAttendance[0]['attendance'].sort((a, b) => {
            if (a.name < b.name) { return -1; }
            else if (a.name > b.name) { return 1; }
            else return 0;
        });
    }

    onStudentDelete(ev: any, student: any) {
        ev.preventDefault();
        ev.stopPropagation();
        console.log(student);
        console.log(this.grpDetailInfo._id);

        this.selectedStudentToDelete = student;
        $('#studentDeletionmodal').modal('show');
    }

    finallyDeleteStudent() {

        this.loaderService.showLoader();
        this.groupService.deleteStudentFromGroup(this.grpDetailInfo._id, this.selectedStudentToDelete._id)
            .subscribe((res: any) => {
                this.loaderService.hideLoader();
                $('#studentDeletionmodal').modal('hide');
                this.removeDeletedStudentFromList();

            }, (err: any) => {
                this.loaderService.hideLoader();
                this.toastService.showError(err.msg);
            });
    }

    removeDeletedStudentFromList() {
        const i = this.grpDetailInfo.students.findIndex(s => s._id == this.selectedStudentToDelete._id);
        if (i > -1) {
            this.grpDetailInfo.students.splice(i, 1);
            this.selectedStudentToDelete = null;
        }
    }



}
