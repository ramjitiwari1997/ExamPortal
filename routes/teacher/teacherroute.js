var express=require("express");
var router=express.Router();
var objectMaker=require("../../crud/teacherSchema/objectMaker");
var crud=require("../../crud/teacherCRUD.js");

function sessionChecker(req,res){
    if(req.session.teacherid){
        return true;
    }
    else{
        res.send({data:"session-expired"})
        return false;
    }
}

router.post('/doRegistration',function(req,res){
    let form=req.body.form;
    let Tests=[];
    let obj= new objectMaker.Reg(form.id,form.name,form.password,Tests);
    crud.doRegist(obj,res);
    console.log(form.password);
});

router.post('/doLogin',function(req,res){
let form=req.body.form;
let obj=new objectMaker.Login(form.mail,form.password);
crud.doLogin(obj,req,res);
});





router.post('/saveTest',function(req,res){
    if(sessionChecker(req,res)){
    let testid=Math.floor(Math.random()*10000);
    let obj=req.body.form;
    console.log("called");
    let testname=obj.testname;
    let houre=obj.houre;
    let minute=obj.minute;
    let isPublish="N";
    let teacherid=req.session.teacherid;
    let prepareObject=new objectMaker.makeTest(teacherid,testname,testid,isPublish,houre,minute);
    let teacherObj=new objectMaker.makeTeacherid(teacherid);
    crud.addTest(teacherObj,prepareObject,req,res);
    }

});
router.post('/getData',function(req,res){
         if(sessionChecker(req,res)){
         let teacherid=req.session.teacherid;
         let teacherObj=new objectMaker.makeTeacherid(teacherid);
         crud.sendData(teacherObj,req,res);
         }
    
});


router.post('/getTests',function(req,res){
        if(sessionChecker(req,res)){
        let teacherid=req.session.teacherid;
        let teacherObj=new objectMaker.makeTeacherid(teacherid);
        crud.sendTests(teacherObj,req,res);
        }
});

router.post('/deleteTest',function(req,res){
    if(sessionChecker(req,res)){
       let teacherid=req.session.teacherid;
       let testid=req.body.form.testid;
       crud.deleteTest({mail:teacherid,testid:testid},req,res);
    }
});
router.get('/dashboard',function(req,res){
    if(req.session.teacherid){
        let path=require("path");
        let fullpath=path.join(__dirname,'/public/teacherFront/welcome.html');
       // res.sendFile(fullpath);
       res.render('teacherWelcome');
    }
    else{
        res.redirect('/#/teacherLogin');
    }
});
router.post("/saveQuestion",function(req,res){
    if(sessionChecker(req,res)){
        let teacherid=req.session.teacherid;
        console.log(req.body.form.testid)
        let testid=req.body.form.testid;
        let teacherObj={mail:teacherid,testid:testid};
        let QuestionObj=req.body.form.question; 
        QuestionObj.queid=testid+""+Math.floor(Math.random()*10000)
        crud.saveQuestion(teacherObj,QuestionObj,req,res);
    }
});
router.post('/getQuestions',function(req,res){
if(sessionChecker(req,res)){
 let teacherid=req.session.teacherid;
 let testid=req.body.form.testid;
 crud.sentQuestion({mail:teacherid,testid:testid},req,res);
    }
});

router.post('/forget',function(req,res){
crud.forgetpwd(req.body.form.mail,req,res);
});


router.post('/checkotp',function(req,res){
    console.log(req.body)
    crud.checkotp(req.body,req,res);
})
router.post('/resetpwd',function(req,res){
    if(req.session.teacherotpmail){
         crud.resetpwd(req,res,req.body.form.mail,req.body.form.password);
    }
    else{
        res.send({data:"session-expired"})
    }
});
router.post('/publishtest',function(req,res){
    if(sessionChecker(req,res)){
        crud.dopublish(req,res);
    }
})
router.post('/getResults',function(req,res){
    if(sessionChecker(req,res)){
        crud.getResults(req,res);
    }
})
module.exports=router;