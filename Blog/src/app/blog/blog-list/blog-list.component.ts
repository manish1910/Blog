import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Response } from '@angular/http';
import { Blog } from '../../models/blog.model';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit 
{

  public blogs:Blog[]=[];
  
  constructor(private appService:AppService) { }

  ngOnInit()
  {
    this.appService.getUser();
    this.appService.getBlogs().subscribe((response:any[])=>{
    this.blogs=response;
    
  });
    
}

}