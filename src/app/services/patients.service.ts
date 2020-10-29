import { Patients } from './../models/patients';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(private http: HttpClient) { }

  getPatients(): Observable<any> {
    return this.http.get('https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/osoby.json')
  }

  getDeaths(): Observable<any> {
    return this.http.get('https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/umrti.json')
  }

}
