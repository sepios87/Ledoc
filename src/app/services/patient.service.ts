import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../models/patient';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private _httpClient: HttpClient) { }

  getPatients(): Observable<any> {
    return this._httpClient.get(environment.apiUrl +'patients');
  }

  getPatient(id: string): Observable<any> {
    return this._httpClient.get(environment.apiUrl + 'patients/' + id);
  }

  addPatient(patient: Patient): Observable<any> {
    return this._httpClient.post(environment.apiUrl + 'patients', patient);
  }

  updatePatient(id: string, patient: Patient): Observable<any> {
    return this._httpClient.put(environment.apiUrl + 'patients/' + id, patient);
  }

  deletePatient(id: string): Observable<any> {
    return this._httpClient.delete(environment.apiUrl + 'patients/' + id);
  }

}
