import { Component, OnInit, Input } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { DetailsService } from '../details.service';
import { FlashMessage } from 'angular-flash-message';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment;
 checUser:boolean;
 editedComment:string;
 editCmtMode:boolean=false;
  constructor
  ( private http:Http,
    private detailsService:DetailsService,
    private flashMessage:FlashMessage,
    private appService:AppService
  ) { }

  ngOnInit() {

    if(this.appService.user.isAdmin||(this.comment.author.id==this.appService.user.id))
    this.checUser=true;
    else
    this.checUser=false;

  }



  onDelete()
  {  
    let headers=new Headers();
    headers.append('Authorization',this.appService.authToken);

    //DELETING FROM SERVER
    this.http.delete("http://localhost:3500/comment/"+this.comment._id,{headers:headers}).subscribe((response:Response)=>
    {
      let res=response.json(); 
      if(res.success)
      {
        this.comment=null;
        this.flashMessage.success(res.msg,{delay:2000,generalClass: 'ui green message'});
      }
       else
        this.flashMessage.danger(res.msg,{delay:5000,generalClass: 'ui red message'});
        this.detailsService.blogChanged();
    });
  }

  onEdit()
  {
    this.editCmtMode=true;
    this.editedComment=this.comment.content;
    this.comment.content=null;
    console.log(this.comment);
  }

  //UPDATING COMMENT
  onUpdateCmt()
  {
    this.editCmtMode=false;

    let headers=new Headers();

    headers.append('Content-Type','application/json');
    headers.append('Authorization', this.appService.authToken);
    
    let newComment=
    {
      'content':this.editedComment
    }

    this.http.put("http://localhost:3500/comment/"+this.comment._id,JSON.stringify(newComment),{headers:headers})
    .subscribe((response:Response)=>
    {
      let res=response.json();
      if(res.success)
      {
        this.comment=res.cmt;
        this.flashMessage.success(res.msg,{delay:2000,generalClass:"ui green message"}); 
      }
    });
  }
}