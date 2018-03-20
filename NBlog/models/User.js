var mongoose 				=require("mongoose"),
    Blog					=require("./Blog"),
    bcrypt                  =require("bcryptjs");

var userSchema = new mongoose.Schema
({
    date:{type:Date, default: Date.now},
	liked:
	[{
		type:mongoose.Schema.ObjectId,
		ref:"Blog"
	}],
	
	isAdmin:{type:Boolean,default:false},
	phone:String,
    activated: {type:Boolean,default:false},
	image :String,
	username:
	{
		type:String,
		required:true,
		unique:true
	},
	password:
	{
		type:String,
		required:true
    }
});

//userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",userSchema);
module.exports.comparePassword=function(candidatePassword,hash,callback)
{
	bcrypt.compare(candidatePassword,hash,(err,isMatch)=>
	{
		if(err) 
		throw err;
		callback(null,isMatch);
	});
}