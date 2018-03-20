var express      =require("express"),
    router       =express.Router(),
    Comment 	 =require("../models/Comments"),
    Blog 		 =require("../models/Blog"),
    User         =require("../models/User"),
    passport     =require("passport");
    
//MIDDLEWARES
var middleware={};

middleware.auth=passport.authenticate('jwt',{failureRedirect:"/failureRedirect",session:false});

middleware.isLoggedin= function(req,res,next)
{
	if(req.user)
	{    
	   return next();	
	}
	else
	{
		res.json
		({
			success:false,
			msg:"You need to login first !"
		});
	}
}

middleware.isAdmin= function(req,res,next)
{
	User.findById(req.user._id,function(err,foundUser)
	{
		if(err)
		{
			console.log(err);
			res.json({success:false,msg:"Something went wrong"})
		}
		else
		{
			if(foundUser.isAdmin===true)
			{    
				return next();
			}
			res.json({success:false,msg:"You are not an Admin"});	
		}
	});
	
}

middleware.checkUser=function(req,res,next)
{
	Blog.findById(req.params.id,function(err,foundBlog)
	{
		if(err)
		{
			console.log(err);
			res.json({success:false,msg:"Something Went Wrong !"});		
			
		}
		else
		{
			if(foundBlog)
			{
				if(foundBlog.author.id.equals(req.user._id)|| req.user.isAdmin===true )
				{
					next();
				}
				else
				{   
				    res.json({success:false,msg:"You don't have permission to do that"});

				}
			}
			else
			{
			    res.json({success:false,msg:"This blog is already deleted"});
			}
		}
	});
}


middleware.checkCommentPermission=function(req,res,next)
{
	Comment.findById(req.params.comment_id,function(err,foundComment)
	{
		if(err)
		{
			res.json({success:false,msg:"Error in find the comment!"})
		}
		else
		{
			if(foundComment)
			{
				if(foundComment.author.id.equals(req.user._id)|| req.user.isAdmin)
				{	
					next();
				}
				else
				{
					res.json({success:false,msg:"You don't have permission to do this !"})
				}
			}
			else
			{
				res.json({success:false,msg:"This comment already is deleted !"})
			}
		}
	});
}

//PAYMENT ROUTE
middleware.checkpayment=function(req,res,next)
{   
	Blog.findById(req.params.id,function(err,foundBlog)
    {
		if(err)
		{
       		res.json({success:false,msg:"Somthing went wrong"});
			console.log(err);
       	}
		else
       	{
			if(foundBlog.author.id.equals(req.user._id)||req.user.isAdmin===true)
			{
				next()
			}
			else
			{
				if(foundBlog.likes>10)
				{
					Blog.find({"_id":req.params.id, "pay":(req.user._id).toString()},function(err,data)
					{   	  		
						if(err)
						{
       			            res.json({success:false,msg:"Something went wrong"});
							console.log(err);
						}
						else
						{
							if(data.length>0)
							{     
								next();
							}
							else
							{    
								res.json({success:false,opt:1,msg:"You Need To Pay First !"});   
							}
						}
					});
				}
				else	
				{
					next();
				}
			}
       	}
    });
}

middleware.isActivated=function(req,res,next)
{
    if(req.user.activated)
    {
    	next();
    }
    else
    {
	  	res.json({success:false,opt:2,msg:"Your Activation is Pending !"});
    }
}


module.exports=middleware;