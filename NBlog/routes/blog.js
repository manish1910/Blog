var express      =require("express"),
    router       =express.Router(),
    Blog 		 =require("../models/Blog"),
    middleware   =require("./middlewares");


//All Blogs List	
router.get("/blogs",function(req,res)
{
   Blog.find({}).populate("comments").exec(function(err,blog)
   {
		if(err)
		{
			console.log("Error in All Blogs");
			console.log(err);
		}
		else
		{
			res.json(blog);
			// res.render("./blogs/index",{blog:blog});
			console.log("All Blog fetched");
		}	
   });	
});

//Single Blog
router.get("/blogs/:id",middleware.auth,middleware.checkpayment,function(req,res)
{
	Blog.findById(req.params.id).populate("comments").exec(function(err,foundBlog)
	{
		if(err)
		{
			console.log("error in single Blog");
			console.log(err);
		}
		else
		{
			console.log("single Blog fetched");
			res.json({success:true,blog:foundBlog});
		}
	});
});

//NEW BLOG
// router.get("/blogs/new", function(req,res)
// {
	// res.render("./blogs/new");
// });

//BLOG CREATION
router.post("/blog/new",middleware.auth,middleware.isActivated, function(req,res)
{
	Blog.create(req.body,function(err,blog)
	{
		if(err)
		{
			// res.redirect("/blogs");
			console.log("error while creating Blog");
			console.log(err);
			res.json({success:false,msg:"Somthing went wrong !"}); 
		}
		else
		{
			blog.author.id=req.user._id;
   			blog.author.name=req.user.name;
			blog.save();
			console.log("Blog created");
			res.json({success:true,msg:"New Article Added ", article:article});
			// blog.author.id=req.user._id;
			// blog.author.username=req.user.username;
			// res.redirect("/blogs");
		}
	});
});

// SHOW PAGE  
// router.get("/blogs/:id",function(req,res)
// {
	// Blog.findById(req.params.id).populate("comments").exec(function(err,foundBlog)
		// {
			// if(err)
			// {
				// console.log(err);
				// res.redirect("back");
			// }
			// else
			// {
				// res.render("./blogs/show",{blog:foundBlog});
			// }
		// });
// });

//EDIT BLOG
// router.get("/blogs/:id/edit", function(req,res)
// {
	// Blog.findById(req.params.id,function(err,foundBlog)
	// {
	    // res.render("./blogs/edit",{blog:foundBlog});
    // });		
// });

//Update Comment
// router.post("/comment/:id",middleware.auth,function(req,res)
// {
// 	Article.findByIdAndUpdate(req.params.id,req.body,function(err,updated)
// 	{
// 		if(err)
// 		{
// 		  console.log("Error In Post Comment");
// 		  console.log(err);
// 		}
// 		else
// 		{
// 		  console.log("Comment Added");
// 		}
// 	})
// });

//UPDATE BLOG
router.put("/blogs/:id",middleware.auth,middleware.checkUser, function(req,res)
{
	Blog.findByIdAndUpdate(req.params.id,req.body,{new:true},function(err,updated)
	{
		if(err)
		{
			// res.redirect("/blogs");
			console.log("error in updating blog");
			console.log(err);
			res.json({success:false,msg:"Somthing went wrong !"});
		}
		else
		{
			// res.redirect("/blogs/"+req.params.id);
			res.json({success:true,msg:"Blog updated successfully.",blog: updated});
		}
	});
});

//DELETE ROUTE
router.delete("/blogs/:id",middleware.auth,middleware.checkUser, function(req,res)
{
	Blog.findByIdAndRemove(req.params.id,function(err)
	{
		if(err)
		{
			console.log("Error in deleting blog");
			console.log(err);
			res.json({success:false,msg:"Somthing went wrong !"});
		}
		else
		{
			console.log("Blog deleted");
			res.json({success:true,msg:"Article deleted"});
		}
	});
});

module.exports=router;
