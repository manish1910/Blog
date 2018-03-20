var express 			= require("express"),
mongoose                =require("mongoose"),
bodyParser   			=require("body-parser"),
Comment 				=require("./models/Comments"),
User					=require("./models/User"),
Blog 					=require("./models/Blog"),
passport			  	=require("passport"),
cors                    =require("cors"),
JwtStrategy 			=require('passport-jwt').Strategy,
jwt                     =require('jsonwebtoken'),
ExtractJwt 				=require('passport-jwt').ExtractJwt;



//Routes
var blogRoute  =require("./routes/blog"),
commentRoute   =require("./routes/comment"),
authRoute      =require("./routes/auth"),
featureRoute   =require("./routes/feature")

//APP CONFIG 
app=express();
//mongoose.connect("mongodb://localhost/ng_blog");
// mongoose.connect("mongodb://manuj:manuj@ds119449.mlab.com:19449/ng-blog");
mongoose.connect("mongodb://Manuj:manuj@ds119449.mlab.com:19449/ng-blog");

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

require('./passport')(passport);

//Routes Use
app.use(blogRoute);
app.use(commentRoute);
app.use(authRoute);
app.use(featureRoute);

//Server
app.listen(3500,function(){
console.log("Blog Server has started");
});
