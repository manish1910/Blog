var express = require("express"),
    router = express.Router(),
    Comment = require("../models/Comments"),
    User = require("../models/User"),
    Blog = require("../models/Blog"),
    middleware   =require("./middlewares");

router.get("/admin" , middleware.isAdmin , function(req,res)
{
    User.find({ username: { $ne: "admin" } }, function(err,users)
    {
        if(err)
        {
            console.log(err);
        } 
        else
        {
            res.render("admin" ,{users : users});
        }
    })
});

router.post("/admin" , middleware.isAdmin , function(req,res)
{
    var public = req.body.public;
    console.log(public);
    console.log("------");
    User.find({},function(err,users)
    {
        if(err)
        {
            console.log(err);
        } 
        else
        {
            User.find({_id: public} , function(err , users)
            {
                users.forEach(function(user)
                {
                    console.log(user.username);
                    if(!user.isActive)
                    {
                        user.isActive = true;
                        user.save();
                    }
                }); 
                res.redirect("/admin");
            });
        }
    })    
    
})

module.exports = router;
