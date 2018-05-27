
const connection=require("./../dbconnection.js");
var schema =connection.Schema;
var testSchma=new schema({mail:String,testid:String,testname:String,
isPublish:String,houre:String,minute:String,Questions:[]});
var obj=connection.model('tests',testSchma);
module.exports=obj;
