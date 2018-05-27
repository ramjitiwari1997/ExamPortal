const connection=require("./../dbconnection.js");
var schema =connection.Schema;
var stdnSchma=new schema({name:String,dept:String,roll:String,mail:String,mob:String,password:String,Tests:[]});
var obj=connection.model('studentReg',stdnSchma);
module.exports=obj;