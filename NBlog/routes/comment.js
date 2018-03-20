var express      =require("express"),
    router       =express.Router(),
    Comment 	 =require("../models/Comments"),
    Blog 		 =require("../models/Blog"),
    middleware   =require("./middlewares");
    


//CREATING NEW COMMENT ROUTE
router.post("/blogs/:id/comment", middleware.auth,function(req,res)
{
	Blog.findById(req.params.id,function(err,foundedBlog)
	{
		if (err) 
		{
			console.log("Error in Comment Creation");
			console.log(err);
		}
		else
		{  
			Comment.create(req.body,function(err,createdComment)
			{
				if (err) 
				{
					console.log("Error in creating Comment");
					console.log(err);
				}
				else
				{
					createdComment.author.id=req.user._id;
					createdComment.author.name=req.user.name;
					createdComment.save();
					foundedBlog.comments.push(createdComment);
					foundedBlog.save();
					// res.redirect("/blogs/"+foundedBlog._id);
					console.log("Comment Created");
					res.json(createdComment);
				}
			});
		}
	});
});


// //EDIT COMMENT PAGE
// router.get("/blogs/:id/comment/:comment_id/edit",middleware.checkCommentPermission,function(req,res)
// {
// 	Comment.findById(req.params.comment_id,function(err,foundComment)
// 	{
// 		if(err)
// 		{
// 			console.log(err);
// 			res.redirect("back");
// 		}
// 		else
// 	   	{
// 			res.render("./comments/edit",{blog_id:req.params.id,Comment:foundComment});				   		
// 	   	}
// 	}); 	
// });
// //UPDATE COMMENT
// router.put("/blogs/:id/comment/:comment_id",middleware.checkCommentPermission,function(req,res)
// {
// 	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updateComment)
// 	{
//        if(err)
//        {
//        	console.log(err);
//        	res.redirect("back");
//        }
//        else
//        {
//        	res.redirect("/blogs/"+req.params.id);
//        }
     
// 	});
// });

//UPDATE COMMENT
router.put("/comment/:comment_id",middleware.auth,middleware.checkCommentPermission,function(req,res)
	{           	
  	    console.log(req.body);

	  	Comment.findByIdAndUpdate(req.params.comment_id,req.body,{new:true},function(err,updateComment)
		{
           if(err)
           {
           	    console.log("Error in  Updating Comment");
	         	console.log(err);
				res.json({success:false,msg:"Error in Updating the comment !"});
			}
           else
           {
           		console.log(updateComment);
  		        res.json({success:true,msg:"Comment Updated",cmt:updateComment});
           	}
         
		});
	});

//DESTROY A COMMENT
router.delete("/comment/:comment_id",middleware.auth,middleware.checkCommentPermission,function(req,res)
{
	Comment.findByIdAndRemove(req.params.comment_id,function(err,response)
	{
		if(err)
		{
			console.log("err in delete Comment");
			console.log(err);
			res.json({success:false,msg:"Error in delete the comment !"});
		}
		else
		{
			res.json({success:true,msg:"Comment deleted !"});
		}
	});
});
module.exports=router;