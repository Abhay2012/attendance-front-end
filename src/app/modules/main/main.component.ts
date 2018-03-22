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

export class MainComponent implements OnInit, AfterViewInit {

  peopleList: People[];
  addressList: Address[];
  clickedPerson: People;

  isAdmin = JSON.parse(localStorage.getItem('username')) === 'admin';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private peopleService: PeopleService,
    private addressService: AddressService
    // public ngProgress: NgProgress
  ) {
  }


  ngOnInit() {
    console.log('isAdmin', this.isAdmin);

    if (this.isAdmin) {
      this.getPeopleList();
    } else {
      this.getAddressList();
    }

  }

  getPeopleList() {

    this.peopleService.getPeopleList()
      .subscribe((list: People[]) => {
        this.peopleList = list;
      });
  }

  getAddressList() {

    this.addressService.getAddressList()
      .subscribe((list: Address[]) => {
        this.addressList = list;
      });
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
