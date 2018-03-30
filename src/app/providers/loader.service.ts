import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoaderService {

    loaderSubject: Subject<boolean> = new Subject<boolean>();

    constructor(
    ) { }

    showLoader() {
        this.loaderSubject.next(true);
    }

    hideLoader() {
        this.loaderSubject.next(false);
    }
}
