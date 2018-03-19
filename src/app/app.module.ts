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
      { path: 'login', component: LoginComponent },
      { path: 'app', loadChildren: 'app/modules/main/main.module#MainModule'},
      { path: '', redirectTo: 'app', pathMatch: 'full' },
    ])
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
