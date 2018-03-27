import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { Address } from '../models/people';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators/tap';


@Injectable()
export class GroupService {

    grpAttendance: any; //  stores the fetched grp attendance in case of address login

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
        return this.customHttp.get(`/attendance/${gId}/${date}`);

    }
}
