import { Travel } from './../../model/Travel';
import { ResponseApi } from '../../model/response-api';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../dialog.service';
import { TravelService } from "../../services/travel/TravelService";

@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrls: ['./travel-list.component.css']
})
export class TravelListComponent implements OnInit {

  assignedToMe: boolean = false;
  page:number=0;
  count:number=5;
  pages:Array<number>;
  shared : SharedService;
  message : {};
  classCss : {};
  listTravel=[];
  travelFilter = new Travel('',null,'','','','',null,null,'',null);

  constructor(
    private dialogService: DialogService,
    private travelService: TravelService,
    private router: Router) { 
      this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.findAll(this.page,this.count);
  }

  findAll(page:number,count:number){
    this.travelService.findAll(page,count).subscribe((responseApi:ResponseApi) => {
        this.listTravel = responseApi['data']['content'];
        this.pages = new Array(responseApi['data']['totalPages']);
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  filter(): void {
    console.log(' this.assignedToMe --> ',this.assignedToMe);
    this.page = 0;
    this.count = 5;
    this.travelService.findByParams(this.page,this.count,this.assignedToMe,this.travelFilter)
    .subscribe((responseApi:ResponseApi) => {
      this.travelFilter.title = this.travelFilter.title == 'uninformed' ? "" : this.travelFilter.title;
      this.travelFilter.number = this.travelFilter.number == 0 ? null : this.travelFilter.number;  
      this.listTravel = responseApi['data']['content'];
        this.pages = new Array(responseApi['data']['totalPages']);
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  cleanFilter(): void {
    this.assignedToMe = false;
    this.page = 0;
    this.count = 5;
    this.travelFilter = new Travel('',null,'','','','',null,null,'',null);
    this.findAll(this.page,this.count);
  }


  edit(id:string){
    this.router.navigate(['/travel-new',id]);
  }

  detail(id:string){
    this.router.navigate(['/travel-detail',id]);
  }

  delete(id:string){
    this.dialogService.confirm('Do you want to delete the travel ?')
      .then((candelete:boolean) => {
          if(candelete){
            this.message = {};
            this.travelService.delete(id).subscribe((responseApi:ResponseApi) => {
                this.showMessage({
                  type: 'success',
                  text: `Record deleted`
                });
                this.findAll(this.page,this.count);
            } , err => {
              this.showMessage({
                type: 'error',
                text: err['error']['errors'][0]
              });
            });
          }
      });
  }

  setNextPage(event:any){
    event.preventDefault();
    if(this.page+1 < this.pages.length){
      this.page =  this.page +1;
      this.findAll(this.page,this.count);
    }
  }

  setPreviousPage(event:any){
    event.preventDefault();
    if(this.page > 0){
      this.page =  this.page - 1;
      this.findAll(this.page,this.count);
    }
  }

  setPage(i,event:any){
    event.preventDefault();
    this.page = i;
    this.findAll(this.page,this.count);
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
