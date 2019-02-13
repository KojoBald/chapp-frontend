// add Angular Material component imports here
import { NgModule } from '@angular/core'
import { 
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule

 } from '@angular/material';

@NgModule({
    exports: [ 
        MatSidenavModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class MaterialModule { }