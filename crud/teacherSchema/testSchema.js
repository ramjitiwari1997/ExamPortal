
const connection=require("./../dbconnection.js");
var schema =connection.Schema;
var testSchma=new schema({teacherid:String,Tests:[]});
var obj=connection.model('tests',testSchma);
module.exports=obj;








var object={
    teacherid:String,
    Tests:[]
}
var Test={
    testid:String,
    isPublish:String,
    questions:[]
}
var question={

}