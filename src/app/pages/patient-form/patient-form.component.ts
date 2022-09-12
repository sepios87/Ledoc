import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';
import { Dictionary, ElementsDictionary } from './../../models/dictionary';
import { DictionaryService } from './../../services/dictionary.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { formatDate } from 'src/app/utils';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit {

  patientForm: FormGroup = this._fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    socialNumber: [''],
    bloodGroup: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    height: [''],
    weight: [''],
    allergies: [''],
    notes: [''],
    lastIncome: [formatDate(new Date())],
    lastSubject: ['-'],
    treatments: this._fb.array([]),
    documents: this._fb.array([]),
  });

  elementsDictionary = ElementsDictionary;

  _idPatient: string | null | undefined;

  get isCreation() { return this._idPatient == undefined };

  constructor(
    private _patientService: PatientService,
    private _route: ActivatedRoute,
    private _dictionaryService: DictionaryService,
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _location: Location,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._idPatient = this._route.snapshot.paramMap.get('id');
    if (!this.isCreation) {
      this._patientService.getPatient(this._idPatient!).subscribe((patient: Patient) => {
        this.patientForm.patchValue(patient);
        patient.treatments.forEach(e => {
          this.addTreatment(e.drug, e.duration, e.repeat);
        })
      });
    }
    // Charger les dictionnaires necessaires pour la page
    this._dictionaryService.loadDictionnary([
      ElementsDictionary.bloodgroups, 
      ElementsDictionary.drugs, 
      ElementsDictionary.repeats, 
      ElementsDictionary.periods, 
      ElementsDictionary.gender
    ]);
  }

  changeEditTreatment(form: any, value: boolean) {
    form.patchValue({
      isEdited: value
    });
  }

  get treatments(): FormArray {
    return this.patientForm.controls["treatments"] as FormArray;
  }

  /**
   * Récupérer un dictionnaire
   * 
   * @param e l'element du dictionnaire voulu
   * @returns un dictionnaire
   */
  getDictionary(e: ElementsDictionary): Dictionary[] {
    return this._dictionaryService.getDictionnaryByName(e)?.dictionary ?? [];
  }

  /**
   * Récupérer le label de l'item du dictionnaire 
   * 
   * @param e l'element du dictionnaire
   * @param id l'index de l'item
   * @returns le label de l'element visé du dictionnaire
   */
  getLabelDictionaryById(e: ElementsDictionary, id: number): string | undefined {
    return this._dictionaryService.getDictionnaryByName(e)?.dictionary.find(e => e.id == id)?.label;
  }

  /**
   * Ajouter un traitement
   * 
   * @param drug le numero du médicament
   * @param duration la durée
   * @param repeats le nombre de répétition
   * @param isEdited si le champs est editable ou pas
   */
  addTreatment(drug: number | '', duration: number | '', repeats: number[], isEdited: boolean = false) {
    const treatment = this._fb.group({
      drug: [drug, Validators.required],
      duration: [duration, Validators.required],
      repeats: [repeats],
      isEdited: [isEdited]
    });

    this.treatments.push(treatment);
  }

  /**
   * Supprimer un traitement
   * 
   * @param treatmentsIndex l'index du traitement
   */
  deleteTreatment(treatmentsIndex: number) {
    this.treatments.removeAt(treatmentsIndex);
  }

  /**
   * Envoyer le formulaire et créer ou modifier un patient
   */
  send() {
    if (this.patientForm.valid) {
      const patient = this.patientForm.value;
      if (this.isCreation) {
        this._snackBar.open(`${patient.firstName} a été créé`, 'OK', {duration: 2000});
        this._patientService.addPatient(patient).subscribe(() =>
          this._router.navigateByUrl('/patients')
        );
      } else {
        this._snackBar.open(`${patient.firstName} a été modifié`, 'OK', {duration: 2000});
        this._patientService.updatePatient(this._idPatient!, patient).subscribe(() =>
          this._location.back()
        );
      }
    }

    if (!this.patientForm.valid) {
      this._location.go('/patients');
      this._snackBar.open('Erreur, il faut remplir tous les champs', 'OK', {duration: 2000})
    }
  }

  /**
   * Supprimer le patient ou annuler la création
   */
  delete() {
    if (!this.isCreation) {
      this._patientService.deletePatient(this._idPatient!).subscribe(() => this._router.navigateByUrl('/patients'));
    }
    if (this.isCreation) {
      this._snackBar.open('Action annulée', 'OK', {duration: 2000});
    } else {
      this._snackBar.open(`${this.patientForm.value.firstName} a été supprimé`);
    }
    this._location.back();
  }

}
