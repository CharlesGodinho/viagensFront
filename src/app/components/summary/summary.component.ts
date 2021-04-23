import { ResponseApi } from './../../model/response-api';
import { Summary } from './../../model/summary';
import { Component, OnInit } from '@angular/core';
import { PassengersService } from '../../services/passengers/passengers.service';
import { TravelService } from '../../services/travel/travel.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  summary: Summary = new Summary();
  message : {};
  classCss : {};

  constructor(
    private travelService: TravelService,
    private passengersService: PassengersService,
  ) { }

  ngOnInit() {
    this.travelService.summary().subscribe((responseApi:ResponseApi) => {
        this.summary = responseApi.data;
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  private showMessage(message: {type: string, text: string}): void {
      this.message = message;
      this.buildClasses(message.type);
      setTimeout(() => {
        this.message = undefined;
      }, 3000);
  }

  private buildClasses(type: string): void {
    this.classCss = {
      'alert': true
    }
    this.classCss['alert-'+type] =  true;
 }

}
