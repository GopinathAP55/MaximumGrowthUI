import { MatSelectModule } from '@angular/material/select'


import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerToggle } from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';


import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
 declarations: [
      
       ],
 exports: [
   MatSnackBarModule ,
   MatProgressSpinnerModule,
   MatRadioModule,
   MatCheckboxModule,
   MatDialogModule,
   MatButtonToggleModule,
   MatSelectModule,
   MatListModule,
   MatSidenavModule,
   MatMenuModule ,
   MatToolbarModule,
   MatIconModule,
   MatTableModule,
   MatSortModule,
   MatPaginatorModule,
   FormsModule,
   ReactiveFormsModule,
   HttpClientModule,
   MatFormFieldModule,
   MatInputModule,
   MatButtonModule,
   MatCardModule,
   MatSlideToggleModule,
   RouterModule,
   
 ],
  providers: [],
  bootstrap: []
})
export class AngularMaterialModule { }
