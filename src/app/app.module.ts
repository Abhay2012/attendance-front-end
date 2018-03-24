import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'ng2-toastr/ng2-toastr';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ShowErrorsModule } from './components/show-errors/show-errors.module';

import { LoginService } from './providers/login.service';
// import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './providers/authGaurd.service';
import { LoginPageGuard } from './providers/loginPageGaurd.service';
import { CustomHttpService } from './providers/custom-http.service';
import { ToastService } from './providers/toast.service';
import { ToastOptions } from 'ng2-toastr/src/toast-options';


/* Custom property for toast message */
export class CustomOption extends ToastOptions {
  animate = 'flyRight';
  newestOnTop = true;
  showCloseButton = true;
  positionClass = 'toast-bottom-right';
  toastLife: 5000;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ShowErrorsModule,
    ToastModule.forRoot(),
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent, canActivate: [LoginPageGuard] },
      { path: 'app', loadChildren: 'app/modules/myApp/myApp.module#MyAppModule', canActivate: [AuthGuard] },
      { path: '', redirectTo: 'app', pathMatch: 'full' },
      { path: '**', redirectTo: 'app', pathMatch: 'full' },
    ])
  ],
  providers: [
    LoginService,
    AuthGuard,
    LoginPageGuard,
    CustomHttpService,
    ToastService,
    { provide: ToastOptions, useClass: CustomOption },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
