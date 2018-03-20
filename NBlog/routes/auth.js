var express      =require("express"),
    router       =express.Router(),
    User	     =require("../models/User"),
	passport     =require("passport"),
    Blog 		 =require("../models/Blog");
	bcrypt      =require("bcryptjs"),
	jwt         =require("jsonwebtoken"),
	middleware  =require("./middlewares");
	
 //home route

router.post("/register",function(req,res)
{		
	
	var newUser=new User(req.body);
	var password=req.body.password;

	bcrypt.genSalt(10,(err,salt)=>
	{
       	bcrypt.hash(password,salt,(err,hash)=>
       	{
			if(err) 
			throw err;
            newUser.password=hash;
			newUser.save((err,user)=>
			{
				if(err)
				return res.json({success:false,msg:"Username already exists!"});
				if(user)
				res.json({success:true,msg:"Successully Registered"});	 
			});
       	});
    });
});

			
//LOGIN------------>>>>>>>

router.post('/login',(req,res,next)=>
{
	const username =req.body.username;
	const password =req.body.password;

	User.findOne({username:username},(err,user)=>
	{
		if(err) 
		{
			res.json({success:false, msg:"Somthing went wrong"});
			throw err;
		}
		if(!user)
		{
			return res.json({success:false, msg:"User not found !"});
		}
		User.comparePassword(password,user.password,(err,isMatch)=>
		{
			if(err) 
			{
				res.json({success:false, msg:"Somthing went wrong"});
            	throw err;
			}

			if(isMatch)
			{
				const token=jwt.sign({data: user},'Hello world',{
					expiresIn:604800  // 1 Week
				});
				res.json
				({
					success:true,
					msg:"Successfully login",
					token:`Bearer ${token}`,
					user:
					{
						id        :   user._id,
						name      :   user.name,
						username  :   user.username,
						date      :   user.date,
						isAdmin   :   user.isAdmin,
						phone     :   user.phone,
						activated :   user.activated,
						image     :   user.image
					}
				});	
			}
			else
			{
				return res.json({success:false,msg:"Wrong password"});
			}
		});
	});
});

//FAILUARE REDIRECT

router.get("/failureRedirect",function(req,res)
{
	res.json({success:false,opt:1,msg:"You need to login first !"});
});

//LOGOUT
router.get("/logout",function(req,res)
{
	req.logout();
	console.log("user logged out");
	// res.redirect("/");
	res.json({success:true,msg:"Successfully Logged Out"});
});
	
module.exports=router;