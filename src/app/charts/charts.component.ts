import { element } from 'protractor';
import { Patients } from './../models/patients';
import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { PatientsService } from './../services/patients.service';
import { filter, pluck, tap, map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit, DoCheck {

  @Input() regionPatients: any;  // all patients ever infected in specific South Bohemia district
  @Input() selectedRegion: any;
  slicedArray: any;
  regionDeaths: any;
  totalDeaths: any;
  yesterday: any;
  date: any;

  public graph = {
    data: [
        { x: [1, 2, 3], y: [2, 6, 3], type: 'scatter'},
        { x: [1, 2, 3], y: [2, 5, 3], type: 'bar' },
    ],
    layout: {width: 640, height: 480, title: 'A Fancy Plot'}
};

  constructor(private patientService: PatientsService, private datePipe: DatePipe) { }

  ngOnInit(): void {

     // get previous day in correct format
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    this.yesterday = this.datePipe.transform(currentDate,"yyyy-MM-dd");

    this.patientService.getDeaths().pipe(
      pluck('data'),
    )
      .subscribe(result => {
        console.log(result);

        // filter deaths based on district
        this.regionDeaths = result.filter((data) => data.okres_lau_kod === this.selectedRegion);
        // calculate daily increase in district
        this.totalDeaths = this.regionDeaths.length;
        // provide data to Chart
        //this.dataSource.data = this.cbPatients;
      })

  }

  // getting regionPatients from patients component and update the list every time new region is selected (in ngOnInit i get NaN and not the array of objects)
  ngDoCheck(): void {
    // this.slicedArray = this.regionPatients.slice(0, 50);

    this.patientService.getDeaths().pipe(
      pluck('data'),
    )
      .subscribe(result => {
        // filter deaths based on district
        this.regionDeaths = result.filter((data) => data.okres_lau_kod === this.selectedRegion);
        // extract a date of each death
        this.date = this.regionDeaths.map(res => res.datum);
        // calculate daily increase in district
        this.totalDeaths = this.regionDeaths.length;
      })


  }

}
