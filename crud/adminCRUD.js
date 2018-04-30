const db=require("./adminSchema/adminSchma.js");
const teacherdb=require("./teacherSchema/registrationSchema")
const studentdb=require("./studentSchema/registrationSchema")
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
    console.log("called");
    let obj1={id:obj.id,password:obj.password}
    db.update({$push:{'teachers':obj1}},function(err){
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
},



addStudent:function(req,res,obj){


    let obj1={id:obj.roll,password:obj.password}
    db.update({$push:{'students':obj1}},function(err){
    if(err){
        console.log("error accured");
    }
    else{
        console.log("added...");
        console.log(obj)
    }
});
studentdb.create(obj,function(err){
    if(err){
        res.send({data:'error'});
    }
    else{
          res.send({data:'success'});
    }
});
},
getTeachers:function(req,res){
teacherdb.find({},{"password":0,"Tests":0,"_id":0,"_v":0},function(err,docs){
    if(err){
        console.log("error ");
        res.send({data:"erroe"});
    }
    else{
        let obj=docs[0];
        if(obj!=null)
       res.send({data:docs})
        else
        res.send({data:"empty"});
    }
})
},


getStudents:function(req,res){
    studentdb.find({},{"password":0,"_id":0,"_v":0},function(err,docs){
        if(err){
            console.log("error");
            res.send({data:"error"});
        }
        else{
            let obj=docs[0];
            if(obj!=null)
           res.send({data:docs})
            else
            res.send({data:"empty"});
        }
    })
    },
}
module.exports=operations;