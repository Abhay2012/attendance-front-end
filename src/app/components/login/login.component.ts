import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../providers/login.service';
import { ToastService } from '../../providers/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  //   providers: [LoginService]
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidCredentials = false;

  @ViewChild('btnLogin') spinnerBtn: HTMLFormElement;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastService: ToastService,
    // private appService: AppService,
    private loginService: LoginService
  ) {
    // if (loginService.isLoggedIn()) {
    //   router.navigateByUrl('/my');
    // }
  }

  ngOnInit() {
    this.createForm();
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  createForm = () => {
    this.loginForm = this.fb.group({
      username: ['admin', Validators.required],
      password: ['abc123', Validators.required]
    });
  }

  onSubmit = () => {
    const isValid = this.loginForm.valid;
    const data = this.loginForm.value;
    if (!isValid || this.loginForm.disabled) { return; }
    this.spinnerBtn.nativeElement.innerHTML = ' Please wait.. <i class="fa fa-refresh fa-spin fa-1x fa-fw"></i>';
    this.loginForm.disable(); // disable form control when form submitted
    this.invalidCredentials = false;
    this.loginService.login(data).subscribe((res: any) => {
      this.storeInfo(res);
      this.router.navigate(['/app'])
        .then(() => {
          const username = JSON.parse(localStorage.getItem('username')) || 'Back';
          this.toastService.showSuccess(`Welcome ${username}`);
        });

    }, (err) => {
      if (err.status === 400) {
        this.invalidCredentials = true;
      } else {
        this.toastService.showError(err.msg);
      }
      this.spinnerBtn.nativeElement.innerHTML = 'Submit';
      localStorage.clear();
      this.loginForm.enable();
    });
  }

  storeInfo = (res) => {
    this.loginService.updateUserInfo(res);
  }


}
