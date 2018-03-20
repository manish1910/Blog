import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Blog } from '../../models/blog.model';
import { Subject } from 'rxjs/Rx';
import { AppService } from '../../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessage } from 'angular-flash-message';


@Injectable()
export class DetailsService 
{
  public blogChange =new Subject<Blog>();
  public blog:Blog;
  constructor
  ( private http:Http,
    private appService:AppService,
    private router:Router,
    private flashMessage:FlashMessage,
    private route:ActivatedRoute
  ) { }

  //Getting blog
  getBlog(id:string)
    {
      let headers=new Headers();
      headers.append('Authorization', this.appService.authToken);
      return this.http.get("http://localhost:3500/blogs/"+id,{headers:headers}).map((response:Response)=>{
      let res=response.json();
      if(res.success)
      {
        this.blog=res.blog;    
        return res.blog;
      }
      else if(!res.success && res.opt==1 ) 
      {
        this.router.navigate(['blogs/'+id+'/payment']);
        this.flashMessage.danger(res.msg,{delay:2000,generalClass: 'ui red message'});
      }
      else 
      {
        this.router.navigate(['/']);      
        this.flashMessage.danger(res.msg,{delay:3000,generalClass: 'ui red message'});
      }
    });
  }
    
  //UPDATING Blog both locally and from database
  updateBlog(id:string,blog:any)
  {
    //LOCALLY UPDATING
    // if(this.article)
    // Object.assign(this.article, article);
 
   
    //UPDATING FROM DATABASE 
    let  header = new Headers();
    header.append('Content-Type','application/json'); 
    header.append('Authorization', this.appService.authToken);

    this.http.put("http://localhost:3500/blogs/"+id,blog,{headers:header})
    .subscribe((response:Response)=>
    {
      let res= response.json();
    
      if(res.success)
      {
        this.flashMessage.success(res.msg,{delay:2000,generalClass: 'ui green message'});
        this.blog=res.blog;
      }
     
      else
      {
        this.flashMessage.danger(res.msg,{delay:3000,generalClass: 'ui red message'});
      }
    });
 
    setTimeout(() => 
    {
      this.router.navigate(['/blogs/'+ id]);
    }, 100);   
 
  }
    
  //UPDATE COMMENT
  onEdit(cmtId:string,cmt:any)
  {
  let comtIndex=this.blog.comments.findIndex(cmt=>cmt._id==cmtId);
  this.blog.comments[comtIndex]=cmt;
  this.blogChanged();

  }

  blogChanged()
  {
    this.blogChange.next(this.blog);
  }
}