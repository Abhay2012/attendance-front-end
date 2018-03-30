import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { GroupService } from './group.service';
import { PeopleService } from './people.service';
import { PeopleListComponent } from '../components/people-list/people-list.component';

@Injectable()
export class PeopleListDeactivateGuard implements CanDeactivate<PeopleListComponent> {

    constructor(
        private groupService: GroupService,
        private peopleService: PeopleService
    ) { }

    canDeactivate(
        component: PeopleListComponent,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        console.log('daeactivatin/////////');
        console.log(route);
        console.log(state);
        
        

        this.groupService.grpAttendance = null;
        this.peopleService.peopleList = null;
        this.peopleService.groupName = null;
        this.peopleService.clickedPerson = null;
        return true;
    }

}
