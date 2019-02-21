// add Angular Material component imports here
import { NgModule } from '@angular/core'
import { 
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatChipsModule,
    MatSnackBarModule,
    MatMenuModule,
    MatAutocompleteModule
 } from '@angular/material';

@NgModule({
    exports: [ 
        MatSidenavModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatStepperModule,
        MatChipsModule,
        MatSnackBarModule,
        MatMenuModule,
        MatAutocompleteModule
    ]
})
export class MaterialModule { }