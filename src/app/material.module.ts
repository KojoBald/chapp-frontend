// add Angular Material component imports here
import { NgModule } from '@angular/core'
import { 
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
 } from '@angular/material';

@NgModule({
    exports: [ 
        MatSidenavModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class MaterialModule { }