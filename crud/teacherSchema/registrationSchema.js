
const connection=require("./../dbconnection.js");
var schema =connection.Schema;
var teacherSchma=new schema({name:String,dept:String,id:String,mail:String,mob:String,password:String,Tests:[]});
var obj=connection.model('teachers',teacherSchma);
module.exports=obj;