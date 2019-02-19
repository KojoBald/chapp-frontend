// add Angular Material component imports here
import { NgModule } from '@angular/core'
import { 
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule

 } from '@angular/material';

@NgModule({
    exports: [ 
        MatSidenavModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatStepperModule
    ]
})
export class MaterialModule { }