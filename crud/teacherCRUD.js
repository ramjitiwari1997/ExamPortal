const db=require("./teacherSchema/registrationSchema.js");
const admindb=require("./adminSchema/adminSchma.js");
const teacherotp=require('./teacherSchema/optSchema');
const testdb=require("./teacherSchema/testSchema")
const resultdb=require("./studentSchema/resultSchema")
const notp=require('notp');
const mailer=require('./mailer');
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
    String:id=obj.id;
    String:password=obj.password;
    let obj1={id:id,password:password}
    //admindb.aggregate([{$match:{teachers:obj1}},{$count:"m"}],function(error,docs){
        admindb.find({},{"_id":0,teachers:{$elemMatch:obj}},function(error,docs){
    if(error){
        res.send({data:"error"});
    }
    else{
        if(docs[0].teachers===undefined){

            res.send({data:"wrong"});
        }
        else{
            req.session.teacherid=obj.mail;
            res.send({data:"success"});
        }
    }
});
},
addTest(teacherObj,prepareObject,req,res){
let obj={mail:teacherObj.mail,testid:prepareObject.testid,testname:prepareObject.testname,
isPublish:"N",houre:prepareObject.houre,minute:prepareObject.minute,Questions:[]};
testdb.create(obj,function(err,docs){
})
db.update(teacherObj,{"$push":{"Tests":prepareObject}},function(err,obj){
    console.log(teacherObj)
    if(err){
        res.send({data:"error"});
    }
    else{
        console.log(obj)
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
deleteTest(obj,req,res){
   console.log(obj)
    db.update({"mail":obj.mail},{"$pull":{"Tests":{"testid":obj.testid}}},function(err,docs){
          if(err){
              res.send({data:"error"});
          }
          else{
              if(docs.n==1){
                  res.send({data:"success"})
              }
              else{
                  res.send({data:"error"});
                  console.log(obj)
              }
                      }
    });
    testdb.deleteOne(obj,function(err){
        if(err){
            console.log(err)
        }
        //else
       // res.send({data:"success"});

})
},
saveQuestion(teacherObj,QuestionObj,req,res){
console.log(teacherObj);
testdb.update(teacherObj,{$push:{'Questions':QuestionObj}},function(err,obj){
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
sentQuestion(obj,req,res){
    //let testname=testnameObj.testname;
    testdb.find(obj,function(err,docs){
        if(err){
            res.send({data:"error"});
        }
        else{
            if(docs.length==0){
                res.send({data:"test not found"})
            }
            else{
                console.log(docs);
                //let l=docs[0].Tests.length;
                // for(i=0;i<l;i++){
                //     if(docs[0].Tests[i].testname==testname){
                //         res.send({data:docs[0].Tests[i]});
                //     }
                         res.send({data:docs[0].Questions});
              }
        }
    });
},
forgetpwd(mail,req,res){   
teacherotp.find({"mail":mail},function(err,docs){
    if(err)
        res.send({data:'error'});
        else{
            
            if(docs.length==0)
            res.send({data:'wrong'})
            else{
                let random=Math.floor(Math.random()*1000);
                let otp=notp.hotp.gen(random,mail);
                teacherotp.update({mail:mail},{mail:mail,secret_key:random},function(err){
                    if(err)
                        res.send({data:"error"})
                    else{
                    res.send({data:"success"});
                       let subject="Password Recovery"
                       let text="<p1>Your One Time Password For Password Recovery is</p1><br>"
                       +otp;
                       mailer.sendmail(mail,subject,text);
                    }
                })
            
            }
        }
})
},
checkotp:function(obj,req,res){
   
   let mail=obj.form.mail;
   let otp=obj.form.otp;
   teacherotp.find({mail:mail},function(err,docs){
       if(err)
       res.send({data:'error'});
       else{
           if(docs.length==0)
           res.send("wrong");
           else{
               let secret_key=docs[0].secret_key;
               let isValid=notp.totp.verify(otp,secret_key,mail);
               if(isValid){
                req.session.teacherotpmail=mail;   
               res.send({data:"success"})
               }
               else
               res.send({data:'wrong'})

           }
       }
   })

},
resetpwd:function(req,res,mail,password){
    admindb.updateOne({"teachers":{$elemMatch:{"mail":mail}}},{$set:{"teachers.$.password":password}},
function(err,data){
    if(err){
        res.send({data:"error"})
    }
    else{
        res.send({data:"success"})
    }
})
},
dopublish(req,res){
    let obj={mail:req.session.teacherid,testid:req.body.form.testid};
    let testid=req.body.form.testid;
    let mail=req.session.teacherid;
    testdb.update(obj,{$set:{'isPublish':'Y'}},function(err){
        if(err){
            res.send({data:"error"});
        }
        else{
            res.send({data:"success"});
        }
    });
    db.updateOne({'mail':mail,'Tests.testid':testid},{$set:{"Tests.$.isPublish":'Y'}},function(err,docs){
        if(err)
        console.log(err)
        else{
            console.log(docs)
        }
    })
},
getResults(req,res){
    let testid=req.body.form.testid;
    resultdb.find({testid:testid},function(err,docs){
        if(err)
        res.send({data:'error'});
        else{
            res.send({data:docs});
        }
    })

}
}
module.exports=operation;