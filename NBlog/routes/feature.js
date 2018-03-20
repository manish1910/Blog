var express      =require("express"),
    router       =express.Router(),
    Comment 	 =require("../models/Comments"),
    User	     =require("../models/User"),
    Blog 		 =require("../models/Blog"),
    middleware   =require("./middlewares");

//LIKE ROUTE
router.post("/blogs/:id/like",middleware.auth, function(req,res)
{
  Blog.findById(req.params.id,function(err,foundBlog)
	{
		if(err)
		{
			console.log(err);
		}
		else
		{
			User.findById(req.user._id,function(err,foundUser)
			{
				if(err)
				{
					console.log(err);
				}
				else
				{
					User.find({"_id":req.user._id,"liked": req.params.id},function(err,data)
					{
						if(err)
						{
							console.log(err);
						}
						else
						{
							
							if(data.length>0)
							{
								res.json({success:false,msg:"You Have Already Liked"});
	               
							}
							else
							{
								foundBlog.likes++;
								foundBlog.save();
								foundUser.liked.push(foundBlog);
								foundUser.save();
								res.json({success:true,msg:"You Liked This Blog"});
							}
						}
					});
					
				}
			});
		}	
	});
});


//PAYMENT ROUTE
router.get("/payments/:id",middleware.auth,function(req,res)
{
   Blog.findById(req.params.id,function(err,foundBlog)
   	{
		if(err)
		{
   			console.log(err);
          	res.json({success:false,msg:"Somthing went wrong !"});
   		}
   		else
   		{
   			foundBlog.pay.push((req.user._id).toString());
   			foundBlog.save();
            res.json({success:true,msg:"Payment was successfull"});
   		}
   	});
});

//Admin Pannel 
router.get("/admin",middleware.auth,middleware.isAdmin,function(req,res)
{
	User.find({},function(err,foundUsers)
	{
		if(err)
		{
			console.log(err);
		  	res.json({success:false,msg:"Something went wrong"});
		   
		}
		else
		{
			res.json({success:true,users:foundUsers});			
		}
	});
	
});

//USER ACTIVATION ROUTE
router.get("/admin/:id",middleware.auth,middleware.isAdmin,function(req,res)
{
	User.findById(req.params.id,function(err,foundUser)
	{
		if(err){
			console.log(err);
	        res.json({success:false,msg:"Something went wrong !"});
		}
		else
		{
			if(foundUser.activated)
			{
				foundUser.activated=false;
				foundUser.isAdmin=false;
				foundUser.save();
                res.json({success:true,msg:"User "+foundUser.name+" Deactivated !",user:foundUser});   
			}
			else
			{
				foundUser.activated=true;
				foundUser.save();
                res.json({success:true,msg:"User "+foundUser.name+" Activated.",user:foundUser});   
			}
		}
	});
});

//USER DELETION
router.delete("/admin/:id",middleware.auth,middleware.isAdmin,function(req,res)
{
	User.findByIdAndRemove(req.params.id,function(err,foundUser)
		{
			if(err)
			{
				console.log(err);
		        res.json({success:false,msg:"Something went wrong !"});
			}
			else
			{
                res.json({success:true,msg:"User "+foundUser.name+" Removed.",user:null});   
				
			}
		});
});

//   MAKING ADMIN
router.get("/admin/:id/isAdmin",middleware.auth,middleware.isAdmin,function(req,res)
{
	User.findById(req.params.id,function(err,foundUser)
	{
		if(err)
		{   
			console.log(err);
			res.json({success:false,msg:"Something went wrong !"});
		}
		else
		{
			foundUser.isAdmin=true;
			foundUser.save();
			res.json({success:true,msg:foundUser.name+" is now Admin.",user:foundUser});
		}
	});
});

module.exports=router;

// // PROFILE ROUTE
// router.get("/profile",function(req,res)
// {
// 	res.render("./profiles/userprofile",{user:req.user});
// });

// //Admin Pannel 
// router.get("/admin",function(req,res)
// {
// 	User.find({"isAdmin":false},function(err,foundUsers)
// 	{
// 		if(err)
// 		{
// 			console.log(err);
// 		}
// 		else
// 		{
// 			res.render("./profiles/admin",{Users:foundUsers});			
// 		}
// 	});
// });
// //USER ACTIVATION ROUTE
// router.post("/admin/:id",function(req,res)
// {
// 	User.findById(req.params.id,function(err,foundUsers)
// 	{
// 		if(err)
// 		{
// 			console.log(err);
// 		}
// 		else
// 		{
// 			if(foundUsers.activated)
// 			{
// 				foundUsers.activated=false;
// 				foundUsers.save();
// 				res.redirect("/admin");
// 			}
// 			else
// 			{
// 				foundUsers.activated=true;
// 				foundUsers.save();
// 				res.redirect("/admin");
// 			}
// 		}
// 	});
// });

// module.exports=router;