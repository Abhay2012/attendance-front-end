import { Component, OnInit } from '@angular/core';
import { People } from '../../models/people';
import { PeopleService } from '../../providers/people.service';
import { ToastService } from '../../providers/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupService } from '../../providers/group.service';
import { LoaderService } from '../../providers/loader.service';
import { LoginService } from '../../providers/login.service';

declare const $;

@Component({
    selector: 'app-people-list',
    templateUrl: './people-list.component.html',
    styleUrls: ['./people-list.component.scss'],
})

export class PeopleListComponent implements OnInit {

    peopleList: Array<People>;
    group: any;
    // absentNote: string;
    // absentNoteStudent: any;
    presentStudents: Array<People>; // just for showing before finally uploading attendance
    remainingStudents: Array<People>;
    uploadPwd: string; // stores the pwd enterd while submitting attendance
    pwdChecking = false; // for showing loader during pwd authentication
    absentMessageList: Array<any>;
    today = new Date();

    constructor(
        private peopleService: PeopleService,
        private toastService: ToastService,
        private loaderService: LoaderService,
        private router: Router,
        private route: ActivatedRoute,
        private groupService: GroupService,
        private loginService: LoginService
    ) { }

    ngOnInit() {

        this.route.params.subscribe((params: any) => {

            const grpId: string = params['id'];
            this.getAttendance(grpId);
        });

    }

    giveCorrectIsoTime() {
        const tzoffset = (new Date()).getTimezoneOffset() * 60000; // offset in milliseconds
        return (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);

    }

    getAttendance(gId: string) {

        const d = this.giveCorrectIsoTime();
        console.log('showing loader');

        this.loaderService.showLoader();
        this.groupService.getGroupAttendace(gId, d)
            .subscribe((res: any) => {
                this.loaderService.hideLoader();
                this.group = res[0];
                this.groupService.grpAttendance = res;
                this.peopleList = this.group.students;
                this.peopleService.peopleList = this.peopleList;

            }, (err: any) => {
                this.loaderService.hideLoader();
                this.toastService.showError(err.msg);
            });

    }

    onPeopleSelect(p: People) {
        this.peopleService.clickedPerson = p;
        this.peopleService.groupName = this.group.group_name;
        this.router.navigate(['signature2'], { relativeTo: this.route });

    }

    // onMarkAbsent(ev: any, stud: any) {
    //     ev.stopPropagation();
    //     ev.preventDefault();
    //     $('#markAbsentModal').modal('show');
    //     this.absentNoteStudent = stud;
    // }

    // onMarkAbsentDone() {
    //     console.log(this.absentNote);
    //     $('#markAbsentModal').modal('hide');
    //     if (this.absentNote && this.absentNote.trim() !== '') {
    //         this.absentNoteStudent.present = false;
    //         this.absentNoteStudent.note = this.absentNote;
    //         this.absentNote = null;
    //     }
    // }

    onUploadAttendance() {
        $('#authenticateModal').modal('show');

    }

    afterAuthentication() {
        this.giveRemainingStudents();
        this.givePresentStudents();
        this.loaderService.showLoader();
        this.peopleService.fetchAbsentMessages()
            .subscribe((res: any) => {
                this.loaderService.hideLoader();
                this.absentMessageList = res.data;
                this.uploadPwd = null;
                $('#attendanceAuthenticate').modal('show');
            }, (err: any) => {
                this.loaderService.hideLoader();
                this.toastService.showError("Couldn't fetch Absent messages, Please enter the messages yourself");
                $('#attendanceAuthenticate').modal('show');
            });
    }

    // give the list of all students whose attendance(Present)has not been marked yet 
    giveRemainingStudents() {
        this.remainingStudents = this.peopleList.filter(p => !p.present).map(p => { p.note = ''; return p; });
    }
    givePresentStudents() {
        this.presentStudents = this.peopleList.filter(p => p.present);
    }

    onAuthenticateUpload() {
        console.log(this.remainingStudents);

        // check all absent notes are filled or not
        const i = this.remainingStudents.findIndex(p => (!p.selectedNote && p.note.trim() === ''));
        if (i > -1) {
            this.toastService.showError('Please enter all the absent notes');
            return;
        }
        this.finallyUpload();
    }

    onAuthenticateSubmit() {
        if (!this.uploadPwd || this.uploadPwd.trim() === '') {
            this.toastService.showError('Password is required to submit attendance');
            return;
        }
        const data: any = {
            username: JSON.parse(localStorage.getItem('username')),
            password: this.uploadPwd
        };
        this.pwdChecking = true;
        this.loginService.login(data).subscribe((res: any) => {
            console.log(res);
            this.pwdChecking = false;
            $('#authenticateModal').modal('hide');
            this.afterAuthentication();
        }, (err) => {
            this.pwdChecking = false;
            if (err.status === 400) {
                this.toastService.showError('incorrect password');
            } else {
                this.toastService.showError(err.msg);
                $('#authenticateModal').modal('hide');
            }

        });
    }

    // checkAllAttendanceDone() {
    //     const a = this.peopleService.peopleList.findIndex(p => !(p.present === true || p.present === false));
    //     return a === -1;
    // }

    // onSubmitCancel() {
    //     $('#attendanceSubmitModal').modal('hide');

    // }

    finallyUpload() {
        // $('#attendanceSubmitModal').modal('hide');

        let data: any = {};
        data.group_id = this.group._id;
        data.group_name = this.group.group_name;
        data.date = this.giveCorrectIsoTime();
        // OLD CODE  STARTS
        // data.attendance = this.peopleService.peopleList.map((p: any) => {

        //     let a: any = {
        //         name: p.name,
        //         id: p._id,
        //         present: p.present || false,
        //     };

        //     if (a.present) {
        //         a.sign = p.sign ? p.sign.changingThisBreaksApplicationSecurity : 'ABSENT NOTE';

        //     } else {
        //         a.note = p.note;
        //     }

        //     return a;


        // });

        // OLD CODE ENDS
        console.log('collecting attendance///////');
        console.log(this.peopleService.peopleList);


        data.attendance = this.peopleService.peopleList.map(p => {

            let a: any = {
                name: p.name,
                id: p._id,
                present: p.present || false,
            };

            if (a.present) {
                // a.sign = p.sign.changingThisBreaksApplicationSecurity; // OLD CODE WHEN SHOW PREVIEW OPTION WAS USED
                a.sign = p.sign;

            } else {
                const absentStudent = this.remainingStudents.find(p => p._id === a.id);
                if (!absentStudent) { throw new Error('student neither marked absent or present'); }
                let finalNote = '';
                if (p.selectedNote) { finalNote += p.selectedNote; }
                if (p.note) {
                    if (p.selectedNote) {
                        finalNote = finalNote + '\n' + p.note;
                    } else {
                        finalNote += p.note;
                    }
                }
                a.note = finalNote;
            }

            return a;


        });

        this.loaderService.showLoader();
        this.peopleService.uploadGroupAttendance(data)
            .subscribe((res: any) => {
                $('#attendanceAuthenticate').modal('hide');
                this.loaderService.hideLoader();
                this.toastService.showSuccess('Attendance saved successfuly');
                this.clearServiceData();
                this.router.navigate(['/app/main']);
            }, (err: any) => {
                this.toastService.showError(err.msg);
                this.loaderService.hideLoader();
            });
    }

    routeBack() {
        // ask for confirmation if he/she is able to mark attendance (i.e people list is present)
        if (this.peopleList) {
            $('#goBackConfirmationModal').modal('show');
        } else {
            this.goBackFinally();
        }
    }

    goBackFinally() {
        this.clearServiceData();
        $('#goBackConfirmationModal').modal('hide');
        this.router.navigate(['/app/main']);

    }

    clearServiceData() {
        this.groupService.grpAttendance = null;
        this.peopleService.peopleList = null;
        this.peopleService.groupName = null;
        this.peopleService.clickedPerson = null;
    }

    goToPreviousAttendance() {
        this.clearServiceData();
        this.router.navigate(['/app/previousAttendance']);

    }

}
