import { Component, OnInit } from '@angular/core';
import { People } from '../../models/people';
import { PeopleService } from '../../providers/people.service';
import { LoaderService } from '../../providers/loader.service';
// import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-myapp',
  templateUrl: './myApp.component.html',
  styleUrls: ['./myApp.component.scss'],
})

export class MyAppComponent implements OnInit {

  showLoader = false;
  constructor(
    private loaderService: LoaderService
  ) {


    // $('#splash').remove(); // remove tne  2nd splash in case of refresh(i.e not routed from login screen)
  }

  ngOnInit() {

    this.loaderService.loaderSubject.asObservable()
      .subscribe((show: boolean) => {
        this.showLoader = show;
      });

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
