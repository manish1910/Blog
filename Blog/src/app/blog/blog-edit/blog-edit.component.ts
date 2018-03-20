import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService } from '../../app.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Blog } from '../../models/blog.model';
import { DetailsService } from '../blog-details/details.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit, OnDestroy
{
  subScription: Subscription;
  blogForm: NgForm;
  editMode: boolean = false;
  blog:     any = null;
  title: string = null;
  image: string = null;
  desc:  string = null;
  id: string;
  loading:boolean;

  constructor( private route:ActivatedRoute, private appService:AppService, private router:Router,
  private detailsService:DetailsService){}

  ngOnInit() 
  {
    this.loading=false;
    this.appService.getUser();
    this.route.params.subscribe((params: Params) => 
    {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      
      this.subScription=this.detailsService.blogChange.subscribe((blog:Blog)=>
      {
        this.blog=blog;
      });

      if (this.editMode) 
      {
        if(this.detailsService.blog)
        {
          this.blog = this.detailsService.blog;
          this.initForm();  
        }
        else
        {
          this.detailsService.getBlog(this.id).subscribe((blog:Blog)=>
          {
            this.blog=blog;
            this.initForm();
          });
        }
        
      }
    });
  }
 
  //FORM INITIALISATION
  initForm() 
  {
    this.title = this.blog.title;
    this.image = this.blog.image;
    this.desc = this.blog.desc;
  }

  // ON FORM SUBMITION
  onSubmit(form: NgForm) 
  {
    if (this.editMode) 
    {
      this.detailsService.updateBlog(this.id,{
      'title' : this.title,
      'image' : this.image,
      'desc' :this.desc
      });
    }

    else 
    {
      this.appService.addBlog({
      // 'id': Math.random(),
       'likes':0,
       'title': form.value.title,
       'image': form.value.image,
       'desc': form.value.desc,
       'author': "Manish"
      
       //'author': this.appService.user.name,
    
      }).subscribe(data=>console.log());
    }

    this.title ="";
    this.image="";
    this.desc="";

    // setTimeout(() => {
    // this.router.navigate(['../'], { relativeTo: this.route });
    // }, 10);
  }
 
  //ON CANCEL
  onCancel() 
  {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy()
  {
    this.subScription.unsubscribe();
  }

}