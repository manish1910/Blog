import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes , RouterModule } from '@angular/router';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { BlogDetailsComponent } from './blog/blog-details/blog-details.component';
import { AdminComponent } from './profiles/admin/admin.component';
import { UserComponent } from './profiles/user/user.component';
import { BlogEditComponent } from './blog/blog-edit/blog-edit.component';
import { PaymentComponent } from './auth/payment/payment.component';
import { AuthService } from './auth.service';

const appRoutes:Routes=
[
  {path:'',redirectTo:'/blogs',pathMatch:'full'},
  {path:'blogs',                                         component:BlogListComponent},
  {path:'blogs/new',         canActivate:[AuthService],  component:BlogEditComponent,pathMatch:'full'},
  {path:'blogs/:id',         canActivate:[AuthService],  component:BlogDetailsComponent},
  {path:'blogs/:id/edit',    canActivate:[AuthService],  component:BlogEditComponent},
  {path:'blogs/:id/payment', canActivate:[AuthService],  component:PaymentComponent,pathMatch:'full'},
  {path:'admin',             canActivate:[AuthService],  component:AdminComponent},
  {path:'user',              canActivate:[AuthService],  component:UserComponent},
  {path:'login',                                         component:SigninComponent},
  {path:'register',                                      component:SignupComponent}
];

@NgModule({
  imports:[CommonModule, RouterModule.forRoot(appRoutes)],
  exports:[ RouterModule ]
  
})
export class AppRoutingModule { }