import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HELP_DESK_API } from '../helpdesk.api';
import { Ticket } from '../../model/ticket';

@Injectable()
export class TicketService {

  constructor(private http: HttpClient) {}

  createOrUpdate(ticket: Ticket){
    console.log('chegou aqui', ticket);
    if(ticket.id != null && ticket.id != ''){
      return this.http.put(`${HELP_DESK_API}/api/ticket`,ticket);
    } else {
      ticket.id = null;
      ticket.status = 'New';
      return this.http.post(`${HELP_DESK_API}/api/ticket`, ticket);
    }
  }

  findAll(page:number,count:number){
    return this.http.get(`${HELP_DESK_API}/api/ticket/${page}/${count}`);
  }

  findById(id:string){
    return this.http.get(`${HELP_DESK_API}/api/ticket/${id}`);
  }

  delete(id:string){
    return this.http.delete(`${HELP_DESK_API}/api/ticket/${id}`);
  }

  findByParams(page:number,count:number,t:Ticket){
    console.log('valor number ',t.number);
    t.number = ""+t.number == '' ? 0 : t.number;
    t.title = t.title == '' ? "uninformed" : t.title;
    t.status = t.status == '' ? "uninformed" : t.status;
    t.priority = t.priority == '' ? "uninformed" : t.priority;
    return this.http.get(`${HELP_DESK_API}/api/ticket/${page}/${count}/${t.number}/${t.title}/${t.status}/${t.priority}`);
  }

  changeStatus(status:string,description:string,ticket:Ticket){
    return this.http.put(`${HELP_DESK_API}/api/ticket/${ticket.id}/${status}/${description}`,ticket);
  }

  chart(){
    return this.http.get(`${HELP_DESK_API}/api/ticket/chart`);
  }

}
