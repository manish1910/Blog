import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AppService } from '../../app.service';
import { FlashMessage } from 'angular-flash-message';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  
  constructor
  ( private http:Http,
    private router:Router,
    public appService:AppService,
    private flashMessage:FlashMessage
  ) { }

  ngOnInit() 
  {
    this.appService.getUser();
  }

  onSubmit(form:NgForm)
  {   
    
   this.appService.onLogin(form.value).subscribe((response)=>
   {
     if(response.success)
     {
        form.reset();
        this.flashMessage.success(response.msg,{delay:2000,generalClass: 'ui green message'});      
        this.router.navigate(['/']);
      }
     else
     {
      this.flashMessage.success(response.msg,{delay:3000,generalClass: 'ui  red message'});
     }
     
     
    }
  );
}
}