import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { Address, Teacher } from '../models/people';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators/tap';


@Injectable()
export class AbsentMessageService {


    absentMessageStore: any;

    constructor(
        private customHttp: CustomHttpService,
    ) { }


    postNewAbsentMessage(data: any) {
        return this.customHttp.post(`/createMessage`, data);

    }

    initializeAbsentMessageStore(data: Array<any>) {
        this.absentMessageStore = data;
    }

    getAbsentMessageList() {
        if (this.absentMessageStore) {
            return of(this.absentMessageStore);
        } else {
            return this.customHttp.get(`/getMessages`);
        }
    }

    addNewMessageToStore(add:any) {
        this.absentMessageStore.data.unshift(add);
    }

    // code for deletion

    deleteAbsentMessage(id: string) {
        return this.customHttp.delete(`/deleteMessage/${id}`);
    }

    deleteAbsentMessageFromStore(index: number) {
        this.absentMessageStore.data.splice(index, 1);


    }

    // code for edition

    editAbsentMessage(data: any) {
        return this.customHttp.post('/updateMessage ', data);
    }

    editAbsentMessageInStore(index: number, newData: any) {
        this.absentMessageStore.data.splice(index, 1, newData);
    }



}
