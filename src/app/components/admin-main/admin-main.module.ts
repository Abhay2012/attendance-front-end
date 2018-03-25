import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminMainComponent } from './admin-main.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [   
        CommonModule,
        FormsModule,
        RouterModule
    ],
    declarations: [
        AdminMainComponent,
    ],
    exports: [AdminMainComponent],
})

export class AdminMainModule {

}
