import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ElementsDictionary } from 'src/app/models/dictionary';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { Patient } from './../../models/patient';
import { PatientService } from './../../services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  patient?: Patient;
  _id?: string | null;

  elementsDictionary = ElementsDictionary;

  constructor(
    private _patientService: PatientService,
    private _route: ActivatedRoute,
    private _dictionaryService: DictionaryService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._id = this._route.snapshot.paramMap.get('id');
    if (this._id) {
      this._patientService.getPatient(this._id).subscribe(patient => {
        this.patient = patient;
      })
    }
    this._dictionaryService.loadDictionnary([ElementsDictionary.bloodgroups, ElementsDictionary.drugs, ElementsDictionary.gender]);
  }

  /**
   * Récupérer le label de l'item du dictionnaire 
   * 
   * @param e l'element du dictionnaire
   * @param id l'index de l'item
   * @returns le label de l'element visé du dictionnaire
   */
  getDictionaryItem(e: ElementsDictionary, id: number): string {
    return this._dictionaryService.getDictionnaryByName(e)?.dictionary.find(e => e.id == id)?.label ?? '';
  }

  /**
   * Supprimer le patient
   */
  delete() {
    if (this._id) {
      this._patientService.deletePatient(this._id).subscribe(() => this._router.navigateByUrl('/patients'));
    }
  }

}
