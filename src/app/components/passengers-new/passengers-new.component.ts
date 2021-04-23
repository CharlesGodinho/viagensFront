import { ResponseApi } from '../../model/response-api';
import { ActivatedRoute } from '@angular/router';
import { Passengers } from '../../model/Passengers';
import { SharedService } from '../../services/shared.service';
import { NgForm } from '@angular/forms';
import { PassengersService } from "../../services/passengers/PassengersService";
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-passengers-new',
  templateUrl: './passengers-new.component.html',
  styleUrls: ['./passengers-new.component.css']
})
export class PassengersNewComponent implements OnInit {

  @ViewChild("form")
  form: NgForm;

  passengers = new Passengers('','','','','','','','','','','','','','','','','','');
  shared : SharedService;
  message : {};
  classCss : {};

  constructor(
    private passengersService: PassengersService,
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
    this.passengersService.findById(id).subscribe((responseApi:ResponseApi) => {
      this.passengers = responseApi.data;
  } , err => {
    this.showMessage({
      type: 'error',
      text: err['error']['errors'][0]
    });
  });
  }

  register(){
    this.message = {};
    this.passengersService.createOrUpdate(this.passengers).subscribe((responseApi:ResponseApi) => {
        this.passengers = new Passengers('','','','','','','','','','','','','','','','','','');
        let passengers : Passengers = responseApi.data;
        this.form.resetForm();
        this.showMessage({
          type: 'success',
          text: `Registered ${passengers.title} successfully`
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
