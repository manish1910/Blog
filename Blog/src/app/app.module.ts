import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BlogDetailsComponent } from './blog/blog-details/blog-details.component';
import { BlogEditComponent } from './blog/blog-edit/blog-edit.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogComponent } from './blog/blog-list/blog/blog.component';
import { PaymentComponent } from './auth/payment/payment.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserComponent } from './profiles/user/user.component';
import { AppService } from './app.service';
import { AdminComponent } from './profiles/admin/admin.component';
import { CommentComponent } from './blog/blog-details/comment/comment.component';
import { ShortPipe } from './short.pipe';
import { FlashMessageModule } from 'angular-flash-message';
import { UsersComponent } from './profiles/admin/user/user.component';
import { AuthService } from './auth.service';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BlogDetailsComponent,
    BlogEditComponent,
    BlogListComponent,
    BlogComponent,
    PaymentComponent,
    SigninComponent,
    SignupComponent,
    UserComponent,   
    UsersComponent,
    AdminComponent,
    CommentComponent,
    ShortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    FlashMessageModule
  ],
  providers: [AppService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
