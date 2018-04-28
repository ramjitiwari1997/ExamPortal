const db=require("./teacherSchema/registrationSchema.js");
const admindb=require("./adminSchema/adminSchma.js");
var operation={
doRegist(obj,res){
db.create(obj,function(err){
    if(err){
        res.send({data:'error'});
    }
    else{
          res.send({data:'success'});
    }
});
},
doLogin(obj,req,res){
    console.log(obj.id);
    admindb.aggregate([{$match:{teachers:obj}},{$count:"m"}],function(error,docs){
    if(error){
        res.send({data:"error"});
    }
    else{
        if(docs.length==0){
            res.send({data:"wrong"});
        }
        else{
            req.session.teacherid=obj.id;
            res.send({data:"success"});
        }
    }
});
},
addTest(teacherObj,prepareObject,req,res){
db.update(teacherObj,{"$push":{"Tests":prepareObject}},function(err,obj){
    if(err){
        res.send({data:"error"});
    }
    else{
        if(obj.n==1){
            res.send({data:"success"})
        }
        else{
            res.send({data:"error"});
        }
    }
});





},
sendData(teacherid,req,res){
    db.find(teacherid,function(err,docs){
        if(err){
            res.send({data:"error"});
        }
        else{
            try {
                res.send({data:docs[0].name});
                
            } catch (error) {
                res.send({data:"session-expired"});
            }
        }
    });
},
sendTests(teacherid,req,res){
    db.find(teacherid,function(err,docs){
      if(err){
          res.send({data:"error"});
      }
      else{
          res.send({data:docs[0].Tests});
      }
    })
},
deleteTest(teacherObj,testnameObj,req,res){
    db.update(teacherObj,{"$pull":{"Tests":testnameObj}},function(err,obj){
          if(err){
              res.send({data:"error"});
          }
          else{
              if(obj.n==1){
                  res.send({data:"success"})
              }
              else{
                  res.send({data:"error"});
              }
          }
    });

},
saveQuestion(teacherObj,testname,QuestionObj,req,res){
    var teacher=teacherObj.id;
db.update({id:teacher,'Tests.testname':testname},{$push:{'Tests.$.Questions':QuestionObj}},function(err,obj){
    if(err){
        res.send({data:"error"});
    }
    else{
        if(obj.n==1){
            res.send({data:"success"})
        }
        else{
            res.send({data:"error"});
        }
    }
});
},
sentQuestion(teacherid,testnameObj,req,res){
    let testname=testnameObj.testname;
    console.log(testname);
    db.find({id:teacherid},function(err,docs){
        if(err){
            res.send({data:"error"});
        }
        else{
            if(docs.length==0){
                res.send({data:"test not found"})
            }
            else{
                //console.log(docs[0].Tests[0].testname);
                let l=docs[0].Tests.length;
                console.log(l);
                for(i=0;i<l;i++){
                    if(docs[0].Tests[i].testname==testname){
                        res.send({data:docs[0].Tests[i]});
                    }
                }
            }
        }
    });
}
}
module.exports=operation;