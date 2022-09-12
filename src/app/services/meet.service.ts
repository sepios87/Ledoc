import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Meet } from '../models/meet';

@Injectable({
  providedIn: 'root'
})
export class MeetService {

  constructor(private _httpClient: HttpClient) { }

  getMeets(): Observable<any> {
    return this._httpClient.get(environment.apiUrl + 'meets')
  }

  getTodayMeet(meets: Meet[]): Meet[] {
    return meets.filter(m => new Date(m.date) == new Date());
  }
}
