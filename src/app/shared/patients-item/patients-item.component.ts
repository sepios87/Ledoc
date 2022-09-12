import { Component, Input, OnInit } from '@angular/core';
import { convertStringToDate } from 'src/app/utils';
import { Patient } from './../../models/patient';
import { PatientService } from './../../services/patient.service';
import { Constants } from './../../constants';

@Component({
  selector: 'app-patients-item',
  templateUrl: './patients-item.component.html',
  styleUrls: ['./patients-item.component.scss']
})
export class PatientsItemComponent implements OnInit {

  @Input() max?: number;

  patients: Patient[] = [];
  page: number = 0;

  private _filterWord: string = '';

  constructor(private _patientService: PatientService) { }

  ngOnInit(): void {
    this.getPatients();
  }

  getDisplayPatient(): Patient[] {
    return (this.max == null
      ? [...this.patients].slice(this.page * Constants.PATIENT_PER_PAGE, (this.page + 1) * Constants.PATIENT_PER_PAGE)
      : this.patients.slice(0, this.max)).filter(e => e.firstName.includes(this._filterWord) || e.lastName.includes(this._filterWord));
  }

  hasNextPage(): boolean {
    return (this.page + 1) * Constants.PATIENT_PER_PAGE < this.patients.length;
  }

  getPatients(): void {
    this._patientService.getPatients().subscribe((response: any[]) => {
      this.patients = response.sort((a, b) => convertStringToDate(a.lastIncome).getDate() - convertStringToDate(b.lastIncome).getDate());
      // Pour tester la pagination avec plus de personnes décommenter
      // for (let i = 0; i <100; i++) {
      //   this.patients[i] = this.patients[i%response.length]
      // }
    });
  }

  get getTotalPages() {
    return Math.floor(this.patients.length / Constants.PATIENT_PER_PAGE) + 1;
  }

  changePage(nextPage: boolean): void {
    this.page += nextPage ? 1 : -1;
  }

  search(event: any) {
    this._filterWord = event.target.value;
  }

}
