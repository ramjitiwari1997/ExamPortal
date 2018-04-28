const connection=require('./../dbconnection.js');

var schema=connection.Schema;
var adminschema=new schema({id:String,name:String,password:String,students:Array,teachers:{}});
var obj=connection.model('admins',adminschema);
obj.find({},function(err,docs){
    if(err){

    }
    else{
        if(docs.length==0){
            obj.create({"id":"admin","name":"admin","password":"admin","students":[],"teachers":[]});
        }
    }
})
module.exports=obj;