import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { AppService } from './app.service';
import { FlashMessage } from 'angular-flash-message';

@Injectable()
export class AuthService implements CanActivate {

  constructor
  ( private appService:AppService,
    private router:Router,
    private flashMessage:FlashMessage
  ){}

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean
  {
    if(this.appService.user)
    {
      return true;
    }
    else
    {
      this.flashMessage.danger("You need to login first !",{delay:3000,generalClass: 'ui red message'});
      this.router.navigate(['login']); 
    }
  }
}