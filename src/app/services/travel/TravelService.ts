import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EXCURSAO_API } from '../excursao.api';
import { Travel } from '../../model/Travel';


@Injectable()
export class TravelService {

  constructor(private http: HttpClient) { }

  createOrUpdate(travel: Travel) {
    if (travel.id != null && travel.id != '') {
      return this.http.put(`${EXCURSAO_API}/api/travel`, travel);
    } else {
      travel.id = null;
      travel.status = 'New';
      return this.http.post(`${EXCURSAO_API}/api/travel`, travel);
    }
  }

  findAll(page: number, count: number) {
    return this.http.get(`${EXCURSAO_API}/api/travel/${page}/${count}`);
  }

  findById(id: string) {
    return this.http.get(`${EXCURSAO_API}/api/travel/${id}`);
  }

  delete(id: string) {
    return this.http.delete(`${EXCURSAO_API}/api/travel/${id}`);
  }

  findByParams(page: number, count: number, assignedToMe: boolean, t: Travel) {
    t.number = t.number == null ? 0 : t.number;
    t.title = t.title == '' ? "uninformed" : t.title;
    t.status = t.status == '' ? "uninformed" : t.status;
    t.priority = t.priority == '' ? "uninformed" : t.priority;
    return this.http.get(`${EXCURSAO_API}/api/travel/${page}/${count}/${t.number}/${t.title}/${t.status}/${t.priority}/${assignedToMe}`);
  }

  changeStatus(status: string, travel: Travel) {
    return this.http.put(`${EXCURSAO_API}/api/travel/${travel.id}/${status}`, travel);
  }

  summary() {
    return this.http.get(`${EXCURSAO_API}/api/travel/summary`);
  }

}
