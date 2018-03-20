var mongoose=require("mongoose");
var Blog=require("./Blog");
var User    =require("./User");


var commentSchema= new mongoose.Schema
({
	author:
	{
		id:
		{
       		type:mongoose.Schema.Types.ObjectId,
			ref:"User"
		},
		name: String,
    	image:String
	},
	content:String
});

module.exports=mongoose.model("Comment", commentSchema);

