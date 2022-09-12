import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PatientFormComponent } from './pages/patient-form/patient-form.component';
import { PatientComponent } from './pages/patient/patient.component';
import { PatientsComponent } from './pages/patients/patients.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'patients',
    component: PatientsComponent
  },
  {
    path: 'patient',
    children: [
      {
        path: 'new',
        component: PatientFormComponent
      },
      {
        path: ':id',
        component: PatientComponent
      },
      {
        path: ':id/edit',
        component: PatientFormComponent,
        data: {
          edit: true
        }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
