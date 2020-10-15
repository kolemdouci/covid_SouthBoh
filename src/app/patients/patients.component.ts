import { PatientsService } from './../services/patients.service';
import { Patients } from './../models/patients';
import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { filter, tap, pluck, map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  selectedRegion: string = 'CZ0311';
  regionSelected(e) {
    this.selectedRegion = e.value;
    this.patientService.getPatients().pipe(
      pluck('data'),
    )
      .subscribe(result => {

        // filter only CB patients
        this.cbPatients = result.filter((data) => data.okres_lau_kod === this.selectedRegion);
        // calculate daily increase in CB only
        this.dailyIncrease = this.cbPatients.filter((data) => data.datum === this.yesterday).length;
        // provide data to Ang Mat table
        this.dataSource.data = this.cbPatients;
        // calculate men patients in CB
        this.menCount = this.cbPatients.filter((data) => data.pohlavi === this.sexDefault).length;
      })
  }

  cbPatients: Patients[] = [];
  regPatients: Patients[];
  menCount: number;

  sexDefault = 'M';

  yesterday: string;
  dailyIncrease: number;

  displayedColumns: string[] = ['datum', 'vek', 'pohlavi', 'kraj_nuts_kod', 'okres_lau_kod', 'nakaza_v_zahranici', 'nakaza_zeme_csu_kod'];
  dataSource = new MatTableDataSource<Patients>(this.cbPatients);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private patientService: PatientsService, private datePipe: DatePipe) {

  }

  ngOnInit(): void {

    // get previous day in correct format
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    this.yesterday = this.datePipe.transform(currentDate,"yyyy-MM-dd");

    this.patientService.getPatients().pipe(
      tap(data => console.log(data)),
      pluck('data'),            // select "data" property
      tap(data => console.log(data)),
      //filter(data => data.okres_lau_kod === 'CZ0311'),   NEFAKA!!!!!!!!

    )
      .subscribe(result => {

        // filter only CB patients
        this.cbPatients = result.filter((data) => data.okres_lau_kod === this.selectedRegion);
        // calculate daily increase in CB only
        this.dailyIncrease = this.cbPatients.filter((data) => data.datum === this.yesterday).length;
        // provide data to Ang Mat table
        this.dataSource.data = this.cbPatients;
        // calculate men patients in CB
        this.menCount = this.cbPatients.filter((data) => data.pohlavi === this.sexDefault).length;
      })

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // filterValue = $event.target.value from HTML which is saved in dataSource filter property
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
