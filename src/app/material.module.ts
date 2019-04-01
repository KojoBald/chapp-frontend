import { NgModule } from '@angular/core';
import { 
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule
} from '@angular/material'

@NgModule({
    exports: [
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule
    ]
})
export class MaterialModule { }