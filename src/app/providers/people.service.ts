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

    constructor(
        private customHttp: CustomHttpService
        //   private toast: MyToastService
    ) { }


    uploadGroupAttendance(data: any) {
        return this.customHttp.post('/saveAttendance', data);
    }
    // pList: People[] = [
    //     { name: "Nitin", id: 1, signed: false, signature: "nnnnnn" },
    //     { name: "Abhay", id: 2, signed: false, signature: "nnnnnn" },
    //     { name: "Maria", id: 3, signed: true, signature: "nnnnnn" },
    //     { name: "Abhay", id: 5, signed: null, signature: "nnnnnn" },
    //     { name: "Arun", id: 1, signed: true, signature: "nnnnnn" },
    //     { name: "Hillary", id: 1, signed: false, signature: "nnnnnn" },
    //     { name: "Arun", id: 1, signed: true, signature: "nnnnnn" },
    //     { name: "James", id: 1, signed: false, signature: "nnnnnn" },
    //     { name: "Roy", id: 1, signed: true, signature: "nnnnnn" },
    //     { name: "Messi", id: 1, signed: false, signature: "nnnnnn" },
    //     { name: "Messi", id: 1, signed: true, signature: "nnnnnn" },
    //     { name: "Nitin", id: 1, signed: false, signature: "nnnnnn" },
    //     { name: "Sachin", id: 1, signed: true, signature: "nnnnnn" },
    //     { name: "Nitin", id: 1, signed: true, signature: "nnnnnn" },
    //     { name: "Roy", id: 1, signed: false, signature: "nnnnnn" },
    //     { name: "Nitin", id: 1, signed: true, signature: "nnnnnn" },
    //     { name: "Messi", id: 1, signed: false, signature: "nnnnnn" }
    // ];

    // getPeopleList() {
    //     return of(this.pList);
    // }
}
