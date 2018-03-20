import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params , Router } from '@angular/router';
import { Http, Response, Headers } from '@angular/http';
import { DetailsService } from './details.service';
import { Subscription } from 'rxjs/Subscription';
import { Blog } from '../../models/blog.model';
import { FlashMessage } from 'angular-flash-message';

import { AppService } from '../../app.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit,OnDestroy
{
  subScription=new Subscription;
  id:string=null;
  blog:any=null;
  deleteButton:boolean=false;
  comment:string;
  checkUser:boolean;

  constructor
  ( private http:Http,
    private appService:AppService,
    private route:ActivatedRoute,
    private router:Router,
    private detailsService:DetailsService,
    private flashMessage:FlashMessage
  ) { }

  ngOnInit() 
  {
    this.appService.getUser();
    this.deleteButton=false;
    this.route.params.subscribe((params:Params)=>
    {
      this.id=params['id'];
    });

    this.subScription=this.detailsService.blogChange.subscribe((blog:Blog)=>
    {
      this.blog=blog;
    });

    this.detailsService.getBlog(this.id).subscribe((blog:any)=>
    {
      this.blog=blog;
    
    
      if(this.appService.user.isAdmin||(blog.author.id==this.appService.user.id))
      this.checkUser=true;
      else
      this.checkUser=false;
    });
  
    if(this.detailsService.blog)
    {
      this.blog= this.detailsService.blog;
    }
    else{
      this.detailsService.getBlog(this.id).subscribe((blog:any)=>{
    
            this.blog=blog;
          });
    }
   }


  //On Delete Blog

  onDelete()
  {
    this.deleteButton=true;
    let headers=new Headers();
    headers.append('Authorization',this.appService.authToken);
    this.http.delete("http://localhost:3500/blogs/"+this.id,{headers:headers})
    .subscribe((response:Response)=>
    {
      let res=response.json();
      
      if(res.success)
      {
        this.flashMessage.success(res.msg,{delay:2000,generalClass: 'ui green message'});
      }
      else
      {
        this.flashMessage.danger(res.msg,{delay:3000,generalClass: 'ui red message'});
      }
    });

    setTimeout(() => 
    {
      this.router.navigate(['../'],{relativeTo:this.route});
    }, 400);
  }

  //LIKE ROUTE
  
  onLike()
  {
    let  header = new Headers();
    header.append('Authorization',this.appService.authToken);
    this.http.get("http://localhost:3500/blogs/"+this.id+"/like",{headers:header})
    .subscribe((response:Response)=>
    {
      let res=response.json();
      if(res.success)
      {
        this.blog.likes++;
        this.flashMessage.success(res.msg,{delay:2000,generalClass: 'ui green message'});     
      }
      else
      {
        this.flashMessage.danger(res.msg,{delay:3000,generalClass:'ui red message'});
      }
    });
  }

  //POST COMMENT
  onComment()
  {
    let  header = new Headers();
    header.append('Content-Type','application/json');
    let comment=
    {
      'content': this.comment
    }
    //this.appService.addComment(this.id,commetObj);
    this.http.post("http://localhost:3500/blogs/"+this.id+"/comment/",JSON.stringify(comment),{headers:header})
    .subscribe((response:Response)=>
    {
      //PUSHING ADDED COMMENT TO LOCAL ARRAY
      this.blog.comments.push(response.json());
    });
    this.comment="";
  }


  // onComment(id:string,comment:any)
  //   {
  //     //FINDING INDEX OF CURRENT ARTICLE
  //    // let index=this.articles.findIndex(el => el._id === id);
          
  //     // let  header = new Headers();
  //     // header.append('Content-Type','application/json');
      
  //     //ADDING COMMENT ON SERVER
      
  //   }

  ngOnDestroy()
  {
    this.subScription.unsubscribe();
  }
}