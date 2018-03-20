import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Http, Headers, Response } from '@angular/http';
import { FlashMessage } from 'angular-flash-message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public users:any[];
  public admin:any;
  
  
  constructor
  ( public appService:AppService,
    private http:Http,
    private flashMessage:FlashMessage,
    private router:Router
  ) {}

  ngOnInit() 
  {
    this.appService.adminCount=0;
    this.appService.activatedCount=0;
    this.appService.userCount=0;
    
    this.appService.getUser();
    this.admin=this.appService.user;
    let headers=new Headers();
    headers.append('Authorization',this.appService.authToken);
    this.http.get("http://localhost:3500/admin",{headers:headers}).subscribe((response:Response)=>
    {
      let res=response.json();
      if(res.success)
      {
        this.users=res.users;
        res.users.forEach((user) => 
        {
          this.appService.userCount++;
          if(user.activated)
          this.appService.activatedCount++;
          if(user.isAdmin)
          this.appService.adminCount++; 
        });
      }
      else
      {
        this.flashMessage.danger(res.msg,{delay:5000,generalClass:'ui red message'});
        this.router.navigate(['/']);  
      }
    });
  }
}
