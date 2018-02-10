import { TicketService } from './../../services/ticket/ticket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-new',
  templateUrl: './ticket-new.component.html',
  styleUrls: ['./ticket-new.component.css']
})
export class TicketNewComponent implements OnInit {

  constructor(
    ticketService: TicketService
  ) { }

  ngOnInit() {
  }

}
