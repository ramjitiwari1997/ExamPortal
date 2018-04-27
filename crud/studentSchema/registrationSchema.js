const connection=require("./../dbconnection.js");
var schema =connection.Schema;
var stdnSchma=new schema({id:String,name:String,password:String});
var obj=connection.model('studentReg',stdnSchma);
module.exports=obj;