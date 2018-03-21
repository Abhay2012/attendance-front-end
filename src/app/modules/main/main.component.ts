import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd, NavigationCancel, NavigationError, ActivatedRoute } from '@angular/router';
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

export class MainComponent implements OnInit, AfterViewInit {

  peopleList: People[];
  clickedPerson: People;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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

  ngAfterViewInit() {

  }



  openSignatureModal(selectedPeople: People) {
    this.clickedPerson = selectedPeople;
    console.log(selectedPeople);
    this.peopleService.clickedPerson = selectedPeople;
    this.router.navigate(['../signature2'], { relativeTo: this.route });
    // $('#myModal').modal('show');

  }

  saveSignature(sign: string | null) {
    // null in case of modal close/cancel when not saving any signature
    console.log('modal closed');
    console.log('signature', sign);


  }

}
