import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { HeaderModule } from '../../components/header/header.module';
import { PeopleListModule } from '../../components/people-list/people-list.module';
import { PeopleService } from '../../providers/people.service';
import { AddressesComponent } from '../../components/addresses/addresses.component';
import { MainComponent } from '../main/main.component';
import { MyAppComponent } from './myApp.component';
import { SignatureModule } from '../../components/signature/signature.module';
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
        // CommonModule,
        HeaderModule,
        PeopleListModule,
        SignatureModule,
        RouterModule.forChild([
            {
                path: '',
                component:MyAppComponent,
                children: [

                    {
                        path: 'main',
                        component: MainComponent
                    },
                    {
                        path: 'addresses',
                        component: AddressesComponent

                    },
                    {
                        path: '',
                        redirectTo: 'main',
                        pathMatch: 'full'
                    }
                ]
            }

        ])

    ],
    exports: [],
    declarations: [
        AddressesComponent,
        MainComponent,
        MyAppComponent
    ],
    providers: [
        PeopleService
    ]
})

export class MyAppModule {

}
