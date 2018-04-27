var express=require("express");
const router=express.Router();
router.post('/doLogin',function(req,res){
    var id=req.body.id;
    var password=req.body.password;
    console.log(id+"  "+password)
     let path=require("path");
      let fullpath=path.join(__dirname,'/public/studentFront/welcome.html');
      if(id==password){
        req.session.uid=id;
        pt="/";
       res.send({path:fullpath});
      }
          else{
        
           res.status(201);
           res.send('/');
    }
});
router.post('/doWelcome',function(req,res){
    if(req.session.uid){
        let path=require("path");
        let fullpath=path.join(__dirname,'/public/studentFront/welcome.html');
      //  res.sendFile(fullpath);
      res.send({id:req.session.uid})
    }
    else{
        let path=require("path");
        let fullpath=path.join(__dirname,'/public/studentFront/studentLogin.html');
        //res.sendFile(fullpath);
        res.status(201);
        res.send({id:"error"});
    }
});
router.post('/doRegistration',function(req,res){

});
module.exports=router;