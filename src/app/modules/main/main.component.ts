import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// import { NgProgress } from 'ngx-progressbar';

declare const $;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  //   styleUrls: ['./main.component.scss'],
})

export class MainComponent implements OnInit {


  role = JSON.parse(localStorage.getItem('role'));
  constructor(
    private router: Router,
  ) {
  }

  ngOnInit() {
    if (this.role === 'teacher') {
      this.router.navigate(['/app/previousAttendance']);
    }
  }

}
