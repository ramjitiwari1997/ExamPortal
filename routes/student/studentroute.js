var express=require("express");
const router=express.Router();
const path=require("path");
var crud=require('../../crud/studentCRUD');

function checkSession(req,res){
    if(req.session.studentid){
        return true;
    }
    else{
        res.send({data:"session-expired"});
        return false;
    }
}



router.post('/doLogin',function(req,res){
    crud.doLogin(req,res);
    
});
router.get('/dashboard',function(req,res){

    if(req.session.studentid){
        res.render('studentWelcome');
    }
    else{
        res.redirect('/#/studentLogin')
    }
});
router.post('/doRegistration',function(req,res){

});
router.post("/studetTestLogin",function(req,res){
    if (checkSession(req,res)){
              crud.studetTestLogin(req,res);
    }
})
router.get('/tests',function(req,res){
    if(req.session.studentid&&req.session.testid){
        res.render('test',{mail:req.session.studentid});
    }
    else{
        res.redirect('/#/studentLogin');
    }
})
router.post('/getTest',function(req,res){
    if(checkSession(req,res)){
        crud.getTest(req,res);
    }
});
router.post('/submitTest',function(req,res){
    if(checkSession(req,res)){
        crud.submitTest(req,res);
    }
});
router.post('/testDetails',function(req,res){
    if(checkSession(req,res)){
        crud.testDetails(req,res);
    }
});
module.exports=router;