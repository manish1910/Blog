import { Component, OnInit, Input } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { AppService } from '../../../app.service';
import { FlashMessage } from 'angular-flash-message';

@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UsersComponent implements OnInit 
{
  @Input() user;
  constructor
  ( private http:Http,
    private appservice:AppService,
    private flashMessage:FlashMessage
  ) {}

  ngOnInit() {
  }

  onActivate()
  {
    let headers=new Headers();
    headers.append('Authorization',this.appservice.authToken);
    this.http.get("http://localhost:3500/admin/"+this.user._id,{headers:headers})
    .subscribe((response:Response)=>
    {
      let res=response.json();
      if(res.success)
      {
        //this.flashMessage.success(res.msg,{delay:2000,generalClass: 'ui green message'});
        if(this.user.isAdmin)
        this.appservice.adminCount--;
        
        this.user=res.user;
        if(this.user.activated)
        this.appservice.activatedCount++;
        if(!this.user.activated)
        this.appservice.activatedCount--;
      }
      else
      {
        this.flashMessage.danger(res.msg,{delay:2000,generalClass: 'ui red message'});
      }
    });
  }

  onDelete()
  {
    let headers=new Headers();
    headers.append('Authorization',this.appservice.authToken);
    this.http.delete("http://localhost:3500/admin/"+this.user._id,{headers:headers})
    .subscribe((response:Response)=>
    {
      let res=response.json();
      if(res.success)
      {
        if(this.user.activated)
        this.appservice.activatedCount--;
        if(this.user.isAdmin)
        this.appservice.adminCount--;

        this.appservice.userCount--;
                
        this.flashMessage.success(res.msg,{delay:2000,generalClass: 'ui green message'});
        this.user=undefined;
      }
      else
      {
        this.flashMessage.danger(res.msg,{delay:3000,generalClass: 'ui red message'});
      }
    });
  }


  onAdmin()
  {
    let headers=new Headers();
    headers.append('Authorization',this.appservice.authToken);

    this.http.get("http://localhost:3500/admin/"+this.user._id+"/isAdmin",{headers:headers})
    .subscribe((response:Response)=>
    {
      let res=response.json();
      if(res.success)
      {
        this.flashMessage.success(res.msg,{delay:2000,generalClass: 'ui green message'});
        this.user=res.user;
        this.appservice.adminCount++;
      }
      else
      {
        this.flashMessage.danger(res.msg,{delay:3000,generalClass: 'ui red message'});
      }
    });
  }
}