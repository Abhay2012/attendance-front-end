import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { MainComponent } from './main.component';
import { HeaderModule } from '../../components/header/header.module';
// import { HeaderComponent } from '../header/header.component';
// import { FooterComponent } from '../footer/footer.component';
// import { SidebarComponent } from '../sidebar/sidebar.component';
// import { AuthGuard } from '@nl-providers/auth.guard';
// import { MyComponent } from './my.component';
// import { MyToastService } from '@nl-providers/toast.service';
// import { LoaderService } from '@nl-providers/loader.service';
// import { DashboardComponent } from '../dashboard/dashboard.component';

// import { NgProgressModule } from 'ngx-progressbar';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    RouterModule.forChild([
    
      {
        path: 'main',
        component: MainComponent
      },
      {
        path: '',
        redirectTo: 'main'
      }
    ])
    // NgProgressModule,

  ],
  exports: [],
  declarations: [
    MainComponent,
    // DashboardComponent,
    // HeaderComponent,
    // FooterComponent,
    // SidebarComponent
  ],
  providers: []
})

export class MainModule {

}
