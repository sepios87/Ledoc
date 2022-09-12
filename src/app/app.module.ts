import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { PatientFormComponent } from './pages/patient-form/patient-form.component';
import { PatientComponent } from './pages/patient/patient.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StatsItemComponent } from './shared/stats-item/stats-item.component';
import { PatientsItemComponent } from './shared/patients-item/patients-item.component';
import { PatientItemComponent } from './shared/patient-item/patient-item.component';
import { HttpClientModule } from '@angular/common/http';
import { MeetTodayItemComponent } from './shared/meet-today-item/meet-today-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

@NgModule({
  declarations: [
    AppComponent,
    PatientsComponent,
    PatientFormComponent,
    PatientComponent,
    DashboardComponent,
    StatsItemComponent,
    PatientsItemComponent,
    PatientItemComponent,
    MeetTodayItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
