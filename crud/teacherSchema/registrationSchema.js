
const connection=require("./../dbconnection.js");
var schema =connection.Schema;
var teacherSchma=new schema({id:String,name:String,password:String,Tests:[]});
var obj=connection.model('teachers',teacherSchma);
module.exports=obj;