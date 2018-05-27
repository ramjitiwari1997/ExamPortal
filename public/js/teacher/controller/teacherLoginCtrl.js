app.controller('teacherLoginCtrl',function($scope,teacherFact,$location){
    var mail="";
    $(document).ready(function(){

    })
    $("#otp").css("display","none")
    $("#resetpwd").css("display","none");
    $("#updatemessage").css("display","none");

   $scope.doLogin=function(){
    var form=$scope.form;
   var promise= teacherFact.do('teacher/doLogin',form);
   promise.then(success,fail);
   function success(data){
       if(data.data.data=="success"){
         alert("login successful");
          window.location="teacher/dashboard"; 
         // $location.url('/dashboard');
       }
       else if(data.data.data=="wrong"){
           $scope.passworderr="wrong userid or password"
       }
       else{
           alert("oops something went wrong");
       }
   }
   function fail(err){
   }
}
$scope.forget=function(){
$("#nextbtn").html('checking please wait....')
$("#nextbtn").attr('disabled',"disabled")
mail=$scope.mailForget;
teacherFact.do('/teacher/forget',{mail:mail}).then((data)=>{
if(data.data.data==="error")
alert('!oops something wents wrong')
else if(data.data.data==="wrong"){
$("#wrongmail").html("mail id is not registered !")
$("#nextbtn").html('next')
    $("#nextbtn").removeAttr("disabled");
}
else{
    $("#entermail").css("display","none")
    $("#otp").css("display","");
    $scope.email=mail;
}
},(fail)=>{
})
}
$scope.checkotp=function(){
    $("#submitbtn").html('checking please wait....')
    $("#submitbtn").attr('disabled',"disabled")
    teacherFact.do('/teacher/checkotp',{mail:mail,otp:$scope.otp}).then((data)=>{
     if(data.data.data=='wrong'){
     $("#wrongotp").html("oops otp is not matched");
     $("#submitbtn").html('submit')
     $("#submitbtn").removeAttr("disabled");
     }
     else if(data.data.data==='error')
     {
         alert("error accured");
     }
     else{
        $("#otp").css("display","none")
        $("#resetpwd").css("display","");
     }
    },(err)=>{
        alert("error accured");
    });

}
$scope.resetpwd=function(){
    $("#submitpwdbtn").html('updating password please wait....')
    $("#submitpwdbtn").attr('disabled',"disabled");
if($scope.newpwd!=$scope.newpwd2)
{
    $('#matchpwd').html("both password didn't mathched");
    $("#submitpwdbtn").html('submit')
    $("#submitpwdbtn").removeAttr("disabled");
}
else{
    teacherFact.do('/teacher/resetpwd',{mail:mail,password:$scope.newpwd}).then((data)=>{
        console.log(data);
      if(data.data.data==="success"){
          $scope.updatemsg="Password updateed successfully"
          $("#resetpwd").css("display","none");
          $("#updatemessage").css("display","");
      }
      else{
      $scope.updatemsg="sorry couldn't update your password please try again";
          $("#resetpwd").css("display","none");
          $("#updatemessage").css("display","none");
          $("#otp").css("display","none");
          $("#entermail").css("display","")
          $("#wrongotp").html("");
          $("#wrongmail").html("")
          $("#submitbtn").html('submit')
          $("#submitbtn").removeAttr("disabled");
          alert('oops opt expired try again');
      }

    },(err)=>{

    })
}

}

});