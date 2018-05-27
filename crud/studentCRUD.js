const admindb=require("./adminSchema/adminSchma")
const testdb=require('./teacherSchema/testSchema');
const studentdb=require("./studentSchema/registrationSchema");
const resultdb=require("./studentSchema/resultSchema")
var operations={
    doLogin(req,res){
        let obj=req.body.form;
        admindb.find({},{"_id":0,students:{$elemMatch:obj}},function(error,docs){
            if(error){
                console.log(error)
                res.send({data:"error"});
            }
            else{
                if(docs[0].students===undefined){
        
                    res.send({data:"wrong"});
                }
                else{
                    req.session.studentid=obj.mail;
                    res.send({data:"success"});
                }
            }
        });
    },
    studetTestLogin(req,res){
         let mail=req.session.studentid;;
         let testid=req.body.form.testid;
         studentdb.find({},{'_id':0,Tests:{$elemMatch:{'testid':testid}}},function(err,docs){
             if(err)
             res.send({data:'error'})
             else{
                 console.log(docs[0].Tests)
                 if(!docs[0].Tests[0]){
                    testdb.find({testid:testid,isPublish:'Y'},function(err,docs){
                        if(err){
                            res.send({data:"error"})
                        }
                        else{
                            if(docs.length==0){
                                res.send({data:"wrong"});
                            }
                            else{
                                req.session.testid=testid;
                                res.send({data:"success"});
                            }
                        }
                    })
                 }
                 else{
                     res.send({data:'taken'})
                 }
             }
         })
          
    },
    getTest(req,res){
        studentdb.update({"mail":req.session.studentid},{$push:{"Tests":{'testid':req.session.testid}}},function(err,dpcs){
                                  
        })
        testdb.find({testid:req.session.testid},function(err,docs){
            if(err)
            res.send({data:"error"})
            else{
                res.send({data:docs[0]});
            }

        })
    },
    submitTest(req,res){
        let form=req.body.form;
        form.studentid=req.session.studentid;
        form.testid=req.session.testid;

        resultdb.create(form,function(err,docs){
            if(err)
            res,send({data:'err'})
            else{
                res.send({data:"success"});
            }
        })
    },
    testDetails(req,res){
        resultdb.find({'studentid':req.session.studentid},function(err,docs){
            if(err)
            res.send({data:'error'})
            else{
                res.send({data:docs});
            }
        })
    }
}
module.exports=operations;

