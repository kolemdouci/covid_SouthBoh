import { Patients } from './../models/patients';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private tableSource = new BehaviorSubject<Patients[]>(null);
  currentSource = this.tableSource.asObservable();

  constructor() { }

  changeTableSource(source: Patients[]) {
    this.tableSource.next(source);
  }
}
