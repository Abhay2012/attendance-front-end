import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd, NavigationCancel, NavigationError, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { People, Address } from '../../models/people';
import { PeopleService } from '../../providers/people.service';
import { AddressService } from '../../providers/address.service';
// import { NgProgress } from 'ngx-progressbar';

declare const $;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  //   styleUrls: ['./main.component.scss'],
})

export class MainComponent implements OnInit{

  peopleList: People[];
  clickedPerson: People;

  isAdmin = JSON.parse(localStorage.getItem('username')) === 'admin';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private peopleService: PeopleService,
    private addressService: AddressService
  ) {
  }


  ngOnInit() {
    console.log('isAdmin', this.isAdmin);

  }


}
