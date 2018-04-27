const connection=require('./../dbconnection.js');
var schema=connection.Schema;
var adminschema=new schema({id:String,name:String,password:String});
var obj=connection.model('admins',adminschema);
module.exports=obj;