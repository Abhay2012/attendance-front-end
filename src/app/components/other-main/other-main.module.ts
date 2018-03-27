import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OtherMainComponent } from './other-main.component';

@NgModule({
    imports: [   
        CommonModule,
        FormsModule,
        RouterModule
    ],
    declarations: [
        OtherMainComponent,
    ],
    exports: [OtherMainComponent],
})

export class OtherMainModule {

}
