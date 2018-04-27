const db=require("./adminSchema/adminSchma.js");
var operations={
    doLogin:function(req,res,obj){
        console.log('called');
db.find(obj,function(error,docs){
if(error){
    res.send({data:"error"});
    console.log(error);
}
else{
    if(docs.length==0){
        res.send({data:"wrong"});
    }
    else{
         
        req.session.adminid=obj.id;
        req.session.adminName=docs[0].name;
        res.send({data:"success"});
        console.log();
    }
}
});
    },
}
module.exports=operations;