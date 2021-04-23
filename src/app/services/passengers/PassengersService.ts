import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EXCURSAO_API } from '../excursao.api';
import { Passengers } from '../../model/Passengers';


@Injectable()
export class PassengersService {

  constructor(private http: HttpClient) { }

  createOrUpdate(passengers: Passengers) {
    if (passengers.id != null && passengers.id != '') {
      return this.http.put(`${EXCURSAO_API}/api/passengers`, passengers);
    } else {
      passengers.id = null;
      return this.http.post(`${EXCURSAO_API}/api/passengers`, passengers);
    }
  }

  findAll(page: number, count: number) {
    return this.http.get(`${EXCURSAO_API}/api/passengers/${page}/${count}`);
  }

  findById(id: string) {
    return this.http.get(`${EXCURSAO_API}/api/passengers/${id}`);
  }

  delete(id: string) {
    return this.http.delete(`${EXCURSAO_API}/api/passengers/${id}`);
  }

  findByParams(page: number, count: number, assignedToMe: boolean, t: Passengers) {
    t.title = t.title == '' ? "uninformed" : t.title;
    t.document = t.document == '' ? "uninformed" : t.document;
    t.name = t.name == '' ? "uninformed" : t.name;
    return this.http.get(`${EXCURSAO_API}/api/passengers/${page}/${count}/${t.name}/${t.title}/${t.birthDate}`);
  }

  changeStatus(status: string, passengers: Passengers) {
    return this.http.put(`${EXCURSAO_API}/api/passengers/${passengers.id}/${status}`, passengers);
  }

  summary() {
    return this.http.get(`${EXCURSAO_API}/api/passengers/summary`);
  }

}
