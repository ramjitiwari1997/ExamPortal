const connection=require("./../dbconnection.js");
var schema =connection.Schema;
var stdnSchma=new schema({name:String,dept:String,roll:String,mail:String,mob:String,Tests:[]});
var obj=connection.model('students',stdnSchma);
module.exports=obj;