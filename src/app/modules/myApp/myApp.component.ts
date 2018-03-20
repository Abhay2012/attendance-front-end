import { Component, OnInit } from '@angular/core';
import { People } from '../../models/people';
import { PeopleService } from '../../providers/people.service';
// import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-myapp',
  templateUrl: './myApp.component.html',
  //   styleUrls: ['./main.component.scss'],
})

export class MyAppComponent implements OnInit {


  constructor(
    // public ngProgress: NgProgress
  ) {


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
