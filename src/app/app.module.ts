import { PatientsService } from './services/patients.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { PatientsComponent } from './patients/patients.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';

import { ChartsComponent } from './charts/charts.component';
/*import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';

PlotlyModule.plotlyjs = PlotlyJS; */

@NgModule({
  declarations: [
    AppComponent,
    PatientsComponent,
    NavbarComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableExporterModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatSelectModule,
    AppRoutingModule,
    //PlotlyModule
  ],
  providers: [
    PatientsService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
