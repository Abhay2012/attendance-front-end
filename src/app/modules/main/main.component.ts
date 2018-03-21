import { Component, OnInit } from '@angular/core';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd, NavigationCancel, NavigationError } from '@angular/router';
import 'rxjs/add/operator/filter';
import { People } from '../../models/people';
import { PeopleService } from '../../providers/people.service';
// import { NgProgress } from 'ngx-progressbar';

declare const $;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  //   styleUrls: ['./main.component.scss'],
})

export class MainComponent implements OnInit {

  peopleList: People[];
  clickedPerson: People;

  constructor(
    private router: Router,
    private peopleService: PeopleService
    // public ngProgress: NgProgress
  ) {


    // $('#splash').remove(); // remove tne  2nd splash in case of refresh(i.e not routed from login screen)
  }

  ngOnInit() {

    this.peopleService.getPeopleList()
      .subscribe((list: People[]) => {
        this.peopleList = list;
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



  openSignatureModal(selectedPeople: People) {
    this.clickedPerson = selectedPeople;
    console.log(selectedPeople);
    $('#myModal').modal('show');

  }

  saveSignature(sign: string | null) {
    // null in case of modal close/cancel when not saving any signature
    console.log('modal closed');
    console.log('signature', sign);


  }

}
