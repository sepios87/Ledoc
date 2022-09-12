import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Period } from '../models/stat';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatService {

  private _stat: BehaviorSubject<any> = new BehaviorSubject(null);
  private _currentPerdiod: Period = Period.day;

  constructor(private _httpClient: HttpClient) { }

  get getCurrentPerdiod(): Period {
    return this._currentPerdiod;
  }

  getStats(): Observable<any> {
    this.requestData();
    return this._stat.asObservable();
  }

  changeStatsPerdiod(period: Period) {
    this._currentPerdiod = period;
    this.requestData();
  }

  requestData(): void {
    this._httpClient.get(environment.apiUrl + 'stats', { params: { "period": this._currentPerdiod } }).subscribe((e) => {
      this._stat.next(e);
    });
  }
}
