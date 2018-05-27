const connection=require("./../dbconnection.js");
var schema =connection.Schema;
var resultSchma=new schema({studentid:String,testid:String,testname:String,tmark:String,nmark:String,pmark:String});
var obj=connection.model('results',resultSchma);
module.exports=obj;