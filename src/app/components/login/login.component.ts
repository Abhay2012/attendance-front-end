import { Component, OnInit, ViewChild } from '@angular/core';
// import { LoginService } from '@nl-providers/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../providers/login.service';
// import { AppService } from '@nl-providers/app.service';
// import { MyToastService } from '@nl-providers/toast.service';
// import { ToastMessagesEnum } from '@nl-model/toast-msg.enum';

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
    // private appService: AppService,
    // private toast: MyToastService,
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
      username: ['', Validators.required],
      password: ['', Validators.required]
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
    //   this.storeInfo(res);
    console.log('login sucess/////');
    this.router.navigate(['/main']);
    
    }, (err) => {
      if (err.status === 400) {
        this.invalidCredentials = true;
      }
      this.spinnerBtn.nativeElement.innerHTML = 'Submit';
      localStorage.clear();
      this.loginForm.enable();
    });
  }

//   storeInfo = (res) => {
//     const success = this.loginService.storeUserInfo(res);
//     success.subscribe((msg) => {
//       this.router.navigate(['/my'])
//         .then(() => {

//           this.toast.successToast(`Welcome ${res.name} [${res.roles}]`);
//         });
//       this.appService.updateUserInfo();
//     });
//   }

}
