import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../providers/loader.service';
import { ToastService } from '../../providers/toast.service';
import { GroupService } from '../../providers/group.service';

@Component({
    selector: 'app-group-list-address',
    templateUrl: './group-list-address.component.html',
    styleUrls: ['./group-list-address.component.scss'],
})

export class GroupListForAddressComponent implements OnInit {

    groups: Array<any>;

    constructor(
        private router: Router,
        private route:ActivatedRoute,
        private ls: LoaderService,
        private ts: ToastService,
        private groupService: GroupService
    ) {
    }

    ngOnInit() {
        // this.getGroups();
    }

    // getGroups() {

    //     this.ls.showLoader();
    //     this.groupService.getGroupListForAddress()
    //         .subscribe((res: any) => {
    //             this.groups = res;
    //             this.groupService.initializeGroupStore(res);
    //             this.ls.hideLoader();

    //         }, (err: any) => {
    //             this.ls.hideLoader();
    //             this.ts.showError(err.msg);
    //         });
    // }

    onGroupSelect(g: any) {
        this.router.navigate([`../main/group/${g._id}`],{relativeTo:this.route});
    }


}
