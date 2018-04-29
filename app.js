const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const session =require("express-session");
app.use(express.static("public"));
const cookieParser=require("cookie-parser");
const ejs=require("ejs");
app.set('view engine','ejs');
//app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(session({  
      secret: 'keyboard cat', 
          cookie: { secure: false,maxAge: 60000*60} 
    }));
app.use(cookieParser());
const admin=require("./routes/admin/adminroute.js");
app.use('/admin',admin);
const student=require("./routes/student/studentroute.js");
app.use('/student',student);
const teacher=require("./routes/teacher/teacherroute.js");
app.use('/teacher',teacher);



app.get('/welcome',function(req,res){
    if(req.session.uid){
        let path=require("path");
        let fullpath=path.join(__dirname,'/public/studentFront/welcome.html');
        res.sendFile(fullpath);
    }
    else{
    res.redirect('/#/studentLogin');
    }
    console.log("its called");
    });
app.get("*",function(req,res){
res.send("");
});
app.listen(process.env.PORT||1234,()=>{
console.log("Server started");
}
);