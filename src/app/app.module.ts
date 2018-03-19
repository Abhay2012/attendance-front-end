import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ShowErrorsModule } from './components/show-errors/show-errors.module';

import { LoginService } from './providers/login.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './modules/main/main.component';
import { AuthGuard } from './providers/authGaurd.service';
import { LoginPageGuard } from './providers/loginPageGaurd.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    ShowErrorsModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent,canActivate:[LoginPageGuard] },
      { path: 'app', loadChildren: 'app/modules/main/main.module#MainModule', canActivate: [AuthGuard] },
      { path: '', redirectTo: 'app', pathMatch: 'full' },
      { path: '**', redirectTo: 'app', pathMatch: 'full' },
    ])
  ],
  providers: [
    LoginService,
    AuthGuard,
    LoginPageGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
