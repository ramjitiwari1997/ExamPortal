app.controller('teacherLoginCtrl',function($scope,teacherFact,$location){
   $scope.doLogin=function(){
    var form=$scope.form;
    console.log($scope.form.password)
   var promise= teacherFact.do('teacher/doLogin',form);
   promise.then(success,fail);
   function success(data){
       console.log(data.data.data);
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
     //  console.log(err);
   }
}
});