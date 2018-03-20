import {Comment} from './comment.model';
export class Blog{


public      _id   :String;     
public    likes   :Number;
public    title   :String;
public	  image   :String;  
public     desc   :String;
public     date   :Date;    
public   author   :String;      
public comments   :Comment[];   

constructor(_id:String,likes:Number,title:String,image:String,desc:String,date:Date,author:String ,comments:Comment[])
{

 this._id      =      _id;
 this.likes    =    likes;
 this.title    =    title;
 this.image    =    image;
 this.desc     =     desc;
 this.date     =     date;
 this.author   =   author;
 this.comments = comments;



}
                
}