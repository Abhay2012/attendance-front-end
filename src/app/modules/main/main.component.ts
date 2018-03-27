import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd, NavigationCancel, NavigationError, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { People, Address } from '../../models/people';
import { PeopleService } from '../../providers/people.service';
import { AddressService } from '../../providers/address.service';
import { LoaderService } from '../../providers/loader.service';
import { GroupService } from '../../providers/group.service';
import { ToastService } from '../../providers/toast.service';
// import { NgProgress } from 'ngx-progressbar';

declare const $;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  //   styleUrls: ['./main.component.scss'],
})

export class MainComponent implements OnInit {


  isAdmin = JSON.parse(localStorage.getItem('username')) === 'admin';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private peopleService: PeopleService,
    private addressService: AddressService,
    private loaderService: LoaderService,
    private groupService: GroupService,
    private toastService: ToastService
  ) {
  }

  ngOnInit() {
    console.log('isAdmin', this.isAdmin);
  }

}
