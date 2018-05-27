const connection=require("./../dbconnection.js");
var schema =connection.Schema;
var otpSchma=new schema({mail:String,secret_key:Number});
var obj=connection.model('teacherotps',otpSchma);
module.exports=obj;