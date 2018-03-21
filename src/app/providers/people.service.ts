import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { People } from '../models/people';
// import { mergeMap } from 'rxjs/operators/mergeMap';
// import { catchError, map, tap,delay } from 'rxjs/operators';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class PeopleService {

    constructor(
        private http: HttpClient,
        //   private toast: MyToastService
    ) { }

    pList: People[] = [
        { name: "Nitin", id: 1, signed: false, signature: "nnnnnn" },
        { name: "Abhay", id: 2, signed: false, signature: "nnnnnn" },
        { name: "Maria", id: 3, signed: true, signature: "nnnnnn" },
        { name: "Abhay", id: 5, signed: null, signature: "nnnnnn" },
        { name: "Arun", id: 1, signed: true, signature: "nnnnnn" },
        { name: "Hillary", id: 1, signed: false, signature: "nnnnnn" },
        { name: "Arun", id: 1, signed: true, signature: "nnnnnn" },
        { name: "James", id: 1, signed: false, signature: "nnnnnn" },
        { name: "Roy", id: 1, signed: true, signature: "nnnnnn" },
        { name: "Messi", id: 1, signed: false, signature: "nnnnnn" },
        { name: "Messi", id: 1, signed: true, signature: "nnnnnn" },
        { name: "Nitin", id: 1, signed: false, signature: "nnnnnn" },
        { name: "Sachin", id: 1, signed: true, signature: "nnnnnn" },
        { name: "Nitin", id: 1, signed: true, signature: "nnnnnn" },
        { name: "Roy", id: 1, signed: false, signature: "nnnnnn" },
        { name: "Nitin", id: 1, signed: true, signature: "nnnnnn" },
        { name: "Messi", id: 1, signed: false, signature: "nnnnnn" }
    ];

    getPeopleList() {
        return of(this.pList);
    }
}
