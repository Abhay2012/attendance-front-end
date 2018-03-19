import { Component, OnInit } from '@angular/core';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd, NavigationCancel, NavigationError } from '@angular/router';
import 'rxjs/add/operator/filter';
// import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
//   styleUrls: ['./main.component.scss'],
})

export class MainComponent implements OnInit {

  showLoader: boolean;
  showBarLoader: boolean;

  constructor(
    // private appService: AppService,
    private router: Router,
    // public ngProgress: NgProgress
  ) {

    // this.appService.updateUserInfo();
    // API += '/management';
    // this.appService.editComplaintInfo().subscribe(res => res);
    // this.appService.getStandardsFromStore().subscribe(res => res);
    // $('#splash').remove(); // remove tne  2nd splash in case of refresh(i.e not routed from login screen)
  }

  ngOnInit() {
   
    /**for showing loader while a lazy loaded module chunk is fetched from server */
    // this.router.events
    //   .filter(ev => ev instanceof RouteConfigLoadStart || ev instanceof RouteConfigLoadEnd)
    //   .subscribe((event) => {
    //     if (event instanceof RouteConfigLoadStart) {
    //       this.ngProgress.start();
    //     } else {
    //       this.ngProgress.done();
    //     }
    //   });
  }

}
