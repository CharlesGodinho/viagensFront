import { ResponseApi } from '../../model/response-api';
import { ActivatedRoute } from '@angular/router';
import { Travel } from './../../model/Travel';
import { SharedService } from '../../services/shared.service';
import { NgForm } from '@angular/forms';
import { TravelService } from "../../services/travel/TravelService";
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-travel-new',
  templateUrl: './travel-new.component.html',
  styleUrls: ['./travel-new.component.css']
})
export class TravelNewComponent implements OnInit {

  @ViewChild("form")
  form: NgForm;

  travel = new Travel('',0,'','','','',null,null,'',null);
  shared : SharedService;
  message : {};
  classCss : {};

  constructor(
    private travelService: TravelService,
    private route: ActivatedRoute) { 
      this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    let id:string = this.route.snapshot.params['id'];
    if(id != undefined){
      this.findById(id);
    }
  }

  findById(id:string){
    this.travelService.findById(id).subscribe((responseApi:ResponseApi) => {
      this.travel = responseApi.data;
  } , err => {
    this.showMessage({
      type: 'error',
      text: err['error']['errors'][0]
    });
  });
  }

  register(){
    this.message = {};
    this.travelService.createOrUpdate(this.travel).subscribe((responseApi:ResponseApi) => {
        this.travel = new Travel('',0,'','','','',null,null,'',null);
        let travel : Travel = responseApi.data;
        this.form.resetForm();
        this.showMessage({
          type: 'success',
          text: `Registered ${travel.title} successfully`
        });
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  getFormGroupClass(isInvalid: boolean, isDirty:boolean): {} {
    return {
      'form-group': true,
      'has-error' : isInvalid  && isDirty,
      'has-success' : !isInvalid  && isDirty
    };
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
