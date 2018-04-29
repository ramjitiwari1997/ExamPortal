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
let obj=new objectMaker.Login(form.id,form.password);
crud.doLogin(obj,req,res);
});





router.post('/saveTest',function(req,res){
    if(sessionChecker(req,res)){
    let obj=req.body.form;
    console.log("called");
    let testname=obj.testname;
    let houre=obj.houre;
    let minute=obj.minute;
    let isPublish="N";
    let Questions=[];
    let teacherid=req.session.teacherid;
    let prepareObject=new objectMaker.makeTest(testname,isPublish,houre,minute,Questions);
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
       let teacherObj=new objectMaker.makeTeacherid(teacherid);
       let testname=req.body.form.testname;
       let testnameObj=new objectMaker.makeTestname(testname);
       crud.deleteTest(teacherObj,testnameObj,req,res);
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
        let testname=req.body.form.testname;
        let question=req.body.form.question;
        let optn1=req.body.form.optn1;
        let optn2=req.body.form.optn2; 
        let optn3=req.body.form.optn3;
        let optn4=req.body.form.optn4;
        let ans=req.body.form.ans;
        let positivemark=req.body.form.positivemark;
        let negativemark=req.body.form.negativemark;
        let teacherObj=new objectMaker.makeTeacherid(teacherid);
        let testnameObj=new objectMaker.makeTestname(testname);
       // var q=crud.FindQueno(teacherObj,testname);
        //console.log(q);
        let q=req.body.form.queno;
        if(q==-1){
            res.send({data:"error"})
        }
        else{
        let QuestionObj=new objectMaker.makeQuestion(q,question,optn1,optn2,optn3,optn4,ans,positivemark,negativemark);   
        crud.saveQuestion(teacherObj,testname,QuestionObj,req,res);
        }
    }
});
router.post('/getQuestions',function(req,res){
    if(sessionChecker(req,res)){
 let teacherid=req.session.teacherid;
 let testname=req.body.form.testname;
 let teacherObj=new objectMaker.makeTeacherid(teacherid);
 let testnameObj=new objectMaker.makeTestname(testname);
 crud.sentQuestion(teacherid,testnameObj,req,res);
    }
});
module.exports=router;