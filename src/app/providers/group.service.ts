import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { Address } from '../models/people';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators/tap';


@Injectable()
export class GroupService {

    grpAttendance: any; //  stores the fetched grp attendance (when attendance is being taken) in case of address login

    constructor(
        private customHttp: CustomHttpService,
    ) { }

    getGroupList() {

        return this.customHttp.get('/getGroups');

    }

    getGroupById(gId: number) {

        return this.customHttp.get(`/getGroupById/${gId}`);
    }


    getDateList(gId: string) {

        return this.customHttp.get(`/getDates/${gId}`);
    }

    getGroupAttendace(gId: string, date: string) {

        if (this.grpAttendance) {
            return of(this.grpAttendance);

        } else {

            return this.customHttp.get(`/attendance/${gId}/${date}`);
        }

    }

    getAttendanceByStudentId(sId: string) {

        return this.customHttp.get(`/attendanceByStudentId/${sId}`);
    }

    deleteStudentFromGroup(gId: string, sId: string) {
        return this.customHttp.delete(`/deleteStudent/${gId}/${sId}`);
    }

    deleteStudentFromAttendance(aId: string, sId: string) {
        return this.customHttp.delete(`/deleteStudentFromAttendance/${aId}/${sId}`);
    }

    deleteAttendance(aId: string) {
        return this.customHttp.delete(`/deleteAttendance/${aId}`);
    }
}
