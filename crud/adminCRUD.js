const db=require("./adminSchema/adminSchma.js");
const teacherdb=require("./teacherSchema/registrationSchema")
const studentdb=require("./studentSchema/registrationSchema");
const teacherotp=require('./teacherSchema/optSchema')
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
    let obj1={mail:obj.mail,password:obj.password}
    db.find({},{'_id':0,teachers:{$elemMatch:{mail:obj1.mail}}},function(err,docs){
        if(err)
        res.send({data:'error'})
        else{
            if(!docs[0].teachers){
 
                db.update({$push:{'teachers':obj1}},function(err){
                        if(err){
                            console.log("error accured");
                        }
                        else{
                        
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
                    teacherotp.create({mail:obj.mail,secret_key:0},function(err){
                        if(err){
                            res.send({data:'error'});
                        }
                    })
            }
            else{
                  res.send({data:'exists'});
            }
        }
    })
},



addStudent:function(req,res,obj){
    let obj1={mail:obj.mail,password:obj.password}
    db.find({},{'_id':0,students:{$elemMatch:{mail:obj1.mail}}},function(err,docs){
        if(err)
        res.send({data:error})
        else{
            if(!docs[0].students[0]){

    db.update({$push:{'students':obj1}},function(err){
    if(err){
        console.log("error accured");
    }
    else{
       
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



            }
            else{
                res.send({data:"exists"})
            }
        }
    })
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
    reset(req,res){
        let form=req.body.form;
        console.log(form)
    db.update({id:form.id,name:form.name,password:form.password},function(err,docs){
        if(err){
            res.send({data:'error'})
        }
        else{
            res.send({data:'success'})
        }
    })
    }

}
module.exports=operations;