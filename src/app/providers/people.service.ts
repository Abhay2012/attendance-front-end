import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { People } from '../models/people';
import { CustomHttpService } from './custom-http.service';
// import { mergeMap } from 'rxjs/operators/mergeMap';
// import { catchError, map, tap,delay } from 'rxjs/operators';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class PeopleService {

    clickedPerson: People;  // tores the people for whom signature page is currently opened to his/her details and take signature
    peopleList: Array<People>; // stores the list of all students of selected group
    groupName: string; // stores the groupName for which attendance is being taken

    constructor(
        private customHttp: CustomHttpService
        //   private toast: MyToastService
    ) { }

    fetchAbsentMessages() {
        return this.customHttp.get('/getMessages');
    }

    uploadGroupAttendance(data: any) {
        return this.customHttp.post('/saveAttendance', data);
    }

    uploadFile(formData: any) {
        return this.customHttp.post('/uploadStudents', formData);
    }

    sendMail(formData: any) {
        return this.customHttp.post('/sendMail', formData);
    }

    changePwd(old: string, nw: string, userName: string) {
        const data: any = {
            oldPassword: old,
            newPassword: nw,
            username: userName
        };
        return this.customHttp.post('/changePassword ', data);

    }

    // edit absent note for a particular student for a  particular date
    editAbsentNote(attendanceId: string, studentAttendanceId: string, note: string) {

        const data: any = {
            _id: attendanceId,
            id: studentAttendanceId,
            note: note
        };
        return this.customHttp.post('/updateNote', data);

    }

}
