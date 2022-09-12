import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Dictionary, ElementsDictionary } from '../models/dictionary';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  private _dictionaries: { element: ElementsDictionary, dictionary: Dictionary[] }[] = [];

  constructor(private _httpClient: HttpClient) { }

  loadDictionnary(elements: ElementsDictionary[]): void {
    elements.forEach((e: ElementsDictionary) => {
      if (!this._dictionaries.some(i => i.element == e))
        this.getDictionnary(e).subscribe(i => {
          this._dictionaries.push({ element: e, dictionary: i });
        })
    });
  }

  getDictionnaryByName(element: ElementsDictionary) {
    return this._dictionaries.find(e => e.element == element)
  }

  private getDictionnary(element: string): Observable<any> {
    return this._httpClient.get(environment.apiUrl + "dictionaries/" + element);
  }
}
