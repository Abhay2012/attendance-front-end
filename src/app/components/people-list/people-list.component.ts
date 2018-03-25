import { Component, OnInit } from '@angular/core';
import { People } from '../../models/people';
import { PeopleService } from '../../providers/people.service';
import { ToastService } from '../../providers/toast.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-people-list',
    templateUrl: './people-list.component.html',
    styleUrls: ['./people-list.component.scss'],
})

export class PeopleListComponent implements OnInit {

    peopleList: Array<People>;
    selectedPeople: People; // not being used now,  to be used later

    constructor(
        private peopleService: PeopleService,
        private toastService: ToastService,
        private router:Router,
        private route:ActivatedRoute
    ) { }

    ngOnInit() {
        this.getPeopleList();
    }

    getPeopleList() {

        this.peopleService.getPeopleList()
            .subscribe((list: People[]) => {
                this.peopleList = list;
            }, (err: any) => {
                this.toastService.showError(err.msg);
            });
    }


    onPeopleSelect(p: People) {
        // this.selectedPeople.emit(p);
        this.peopleService.clickedPerson =p;
        this.router.navigate(['../signature2'], { relativeTo: this.route });

    }
}
