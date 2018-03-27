import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from '../../providers/group.service';
import { LoaderService } from '../../providers/loader.service';
import { ToastService } from '../../providers/toast.service';

@Component({
    selector: 'app-other-main',
    templateUrl: './other-main.component.html',
    styleUrls: ['./other-main.component.scss']
})

export class OtherMainComponent implements OnInit {

    groups: Array<any>;
    dates: Array<any>;

    // ngModal variables
    selectedGroup: any;
    selectedDate: any;

    constructor(
        private router: Router,
        private groupService: GroupService,
        private loaderService: LoaderService,
        private toastService: ToastService
    ) {
    }

    ngOnInit() {
        // this.getGroups();
    }

    onDateChange(){
        
    }

    // getGroups() {

    //     this.loaderService.showLoader();
    //     this.groupService.getGroupListForAdmin()
    //         .subscribe((res: any) => {
    //             this.groups = res.groups;
    //             this.loaderService.hideLoader();

    //         }, (err: any) => {
    //             this.loaderService.hideLoader();
    //             this.toastService.showError(err.msg);
    //         });
    // }

    onGroupChange() {
        console.log(this.selectedGroup);

        this.getDates();
    }

    getDates() {

        this.loaderService.showLoader();
        this.groupService.getDateList(this.selectedGroup._id)
            .subscribe((res: any) => {
                this.dates = res;
                this.loaderService.hideLoader();

            }, (err: any) => {
                this.loaderService.hideLoader();
                this.toastService.showError(err.msg);
            }); 
    }

}
