import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AppService } from '../../app.service';
import { FlashMessage } from 'angular-flash-message';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  id:string;

  constructor(private http:Http,
              private route:ActivatedRoute,
              private  router:Router,
              private appService:AppService,
              private flashMessage:FlashMessage) { }

  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{
      this.id=params['id'];
    });

    this.appService.getUser();
   
  }
  
  onPayment()
  {
    let headers=new Headers();
    headers.append('Authorization',this.appService.authToken);
     this.http.get("http://localhost:3000/payments/"+this.id,{headers:headers})
     .subscribe((response:Response)=>{

      let res=response.json();
      if(res.success)
      {
        this.flashMessage.success(res.msg,{delay:2000,generalClass: 'ui green message'});
        setTimeout(() => {
          this.router.navigate(['../'],{relativeTo:this.route});
        }, 200);
      }
      else{
        this.flashMessage.danger(res.msg,{delay:3000,generalClass: 'ui red message'});
        
      }

     });
  }

}