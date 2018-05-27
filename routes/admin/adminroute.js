var express=require('express');
const router=express.Router();
var crud=require("./../../crud/adminCRUD.js");
var maker=require("./../../crud/adminSchema/objectMaker.js");

function sessionChecker(req,res){
    if(req.session.adminid){
        return true;
    }
    else{
        res.send({data:"session-expired"})
        return false;
    }
}


router.post("/doLogin",function(req,res){
let form=req.body.form;
let id=form.uname;
let password=form.psw;
let obj=new maker.loginObj(id,password);
//console.log(obj.id+" "+obj.password);
crud.doLogin(req,res,obj);
});


router.get('/dashboard',function(req,res){
    if(req.session.adminid){
   res.render('adminWelcome',{adminName:req.session.adminName});
  // console.log(req.session.adminName);
    }
    else{
        res.redirect('/#/adminLogin');
    }
});
router.post("/addstd",function(req,res){
    if(sessionChecker(req,res)){
       let form=req.body.form;
       let obj= new maker.teacherObj(form);
       crud.addStudent(req,res,form);
    }
});


router.post('/addTeacher',function(req,res){
      if(sessionChecker(req,res)){
       let form=req.body.form;
       let obj=new maker.teacherObj(form);
       crud.addTeacher(req,res,obj);
      }
});


router.post('/getTeachers',function(req,res){
    if(sessionChecker(req,res)){
        crud.getTeachers(req,res);
    }
})


router.post('/getStudents',function(req,res){
    if(sessionChecker(req,res)){
        crud.getStudents(req,res);
    }
});
router.post('/reset',function(req,res){
    if(sessionChecker(req,res)){
        crud.reset(req,res);
        req.session.destroy(function(){

        })
    }
})

module.exports=router;