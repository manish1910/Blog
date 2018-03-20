import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { FlashMessage } from 'angular-flash-message';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

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

    let header=new Headers();
    header.append('Content-Type','application/json');
  
    this.http.post("http://localhost:3500/register",form.value,{headers:header})
    .subscribe((response:Response)=>
    {
      form.reset();
      if(response.json().success)
      {
        this.flashMessage.success(response.json().msg,{delay:2000,generalClass: 'ui green message'});
        this.router.navigate(['login']);
      }
      else
      {
        this.flashMessage.danger(response.json().msg,{delay:3000,generalClass: 'ui red message'});
      }
    });
  }
}