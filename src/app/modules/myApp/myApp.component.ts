import { Component, OnInit } from '@angular/core';
import { People } from '../../models/people';
import { PeopleService } from '../../providers/people.service';
import { LoaderService } from '../../providers/loader.service';

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

  }

  ngOnInit() {

    this.loaderService.loaderSubject.asObservable()
      .subscribe((show: boolean) => {
        this.showLoader = show;
      });

 
  }

}
