import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs/Rx';
import { Blog } from './models/blog.model';
import { FlashMessage } from 'angular-flash-message';

@Injectable()
export class AppService 
{
  
  public blogs:Blog[]=[];

  public editMode:boolean;

  public user:any;
  public authToken:any;

  public userCount:number=0;
  public activatedCount:number=0;
  public adminCount:number=0;
   
  constructor
  ( private http:Http,
    private router:Router,
    private flashMessage:FlashMessage,
    private route:ActivatedRoute
  ) {}

  //Operations On Blogs

    //Fetching all Blogs
    getBlogs()
    {
      return this.http.get("http://localhost:3500/blogs").map((response:Response)=>
      {
        //wrinting locally and returning observable
        this.blogs=response.json();  
        return response.json();
      })
    }

   //ADDING AN ARTICLE
   addBlog(blog:any)
   {
    let  header = new Headers();
    header.append('Content-Type','application/json');
    header.append('Authorization', this.authToken);
      //ADDING AT SERVER
      return this.http.post("http://localhost:3500/blogs",JSON.stringify(blog),{headers:header})
      .map((response:Response)=>{
      //ADDING RESPONSE TO LOCAL STORAGE
      let res = response.json();
      if(res.success)
      {
        this.blogs.push(res.blog);
        this.flashMessage.success(res.msg,{delay:2000,generalClass: 'ui green message'}); 
      }
      else
      {
        this.flashMessage.danger(res.msg,{delay:5000,generalClass: 'ui red message'});
      }
      setTimeout(() => 
      {
        this.router.navigate(['../'], { relativeTo: this.route });
      }, 100);
    });
  }

  onLogin(user:any)
  {
    let header=new Headers();
    header.append('Content-Type','application/json');
    return this.http.post("http://localhost:3500/login",JSON.stringify(user),{headers:header})
    .map((response:Response)=>
    {
      let res=response.json();
      localStorage.setItem('user',JSON.stringify(res.user));
      localStorage.setItem('id_token',res.token);
      // localStorage.setItem('user',JSON.stringify(response.json().user));     
      this.user=res.user;
      this.authToken=res.token;
      return res;
    });
  }

  onLogOut()
  {
    if(this.user)
    {
      this.http.get("http://localhost:3500/logout").subscribe((response:Response)=>{
      this.flashMessage.success(response.json().msg,{delay:2000,generalClass: 'ui green message'});
      this.user=undefined;
      this.authToken=undefined;
      localStorage.clear();
    });
  }
}

getUser()
{
  if(!this.user)
  {
    if(localStorage.getItem('user')!=null)
    {
      this.authToken=localStorage.getItem('id_token');
      this.user=JSON.parse(localStorage.getItem('user'));
    }
  }
}                                    
}


