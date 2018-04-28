const db=require("./adminSchema/adminSchma.js");
const teacherdb=require("./teacherSchema/registrationSchema")
var operations={
doLogin:function(req,res,obj){
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
    }
}
});
    },



addTeacher:function(req,res,obj){
    //console.log(obj);
db.update({$push:{'teachers':obj}},function(err){
    if(err){
        console.log("error accured");
    }
    else{
        console.log("added...");
        console.log(obj)
    }
});
teacherdb.create(obj,function(err){
    if(err){
        res.send({data:'error'});
    }
    else{
          res.send({data:'success'});
    }
});

    }
}
module.exports=operations;