var express=require('express');
const router=express.Router();
var crud=require("./../../crud/adminCRUD.js");
var maker=require("./../../crud/adminSchema/objectMaker.js");




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
    //console.log(req.body.form);
res.send({data:'success'});
});



router.post('/addTeacher',function(req,res){
       let form=req.body.form;
       let obj= new maker.teacherObj(form.name,form.id,form.dept,form.psw);
       console.log(obj);
       crud.addTeacher(req,res,obj);
})
module.exports=router;