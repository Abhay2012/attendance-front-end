import { NgModule } from '@angular/core';
import { SignatureComponent } from './signature.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [ CommonModule],
    declarations: [
        SignatureComponent,
    ],
    exports: [SignatureComponent],
})

export class SignatureModule {

}
