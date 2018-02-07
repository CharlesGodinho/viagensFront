import { Router } from '@angular/router';
import { UserService } from './../../services/user/user.service';
import { SharedService } from './../../services/shared.service';
import { User } from './../../model/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {

  user = new User('','','');
  shared : SharedService;
  message : {};
  classCss : {};
  
  constructor(private userService: UserService,
    private router: Router) { 
      this.shared = SharedService.getInstance();
    }

  ngOnInit() {
  }

  register(){
    this.message = '';
    this.userService.create(this.user).subscribe(userNew => {
        this.showMessage({
          type: 'success',
          text: `Registered user successfully ${userNew.email}`
        });
    } , err => {
      console.log('err --> ', err);
      console.log('err.status --> ', err.status);
      console.log('err.statusText --> ', err.statusText);
      this.showMessage({
        type: 'error',
        text: 'Error '+ err.statusText
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
