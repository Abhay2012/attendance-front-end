import { Component, ViewContainerRef } from '@angular/core';
import { LoginService } from './providers/login.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);

    if (!loginService.isLoggedIn()) {
      router.navigate(['/login'])
        .then(() => {
          /**remove the 2nd splash present in app component's html,
           * which is displayed untill the dashboard  screen is visible*/
          // $('#splash').remove();
        });
    }

  }
}
