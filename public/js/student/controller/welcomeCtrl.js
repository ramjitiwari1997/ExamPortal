app.controller("welcomeCtrl",function($scope,$http,$location){
   console.log("controller called");
$http.post("student/doWelcome").then(success,fail);
 function success(data){
     if(data.data.id==="error"){
       window.location="/#/studentLogin";
     }
     else{
     $scope.user=data.data.id;
     }
     
 }
 function fail(data){
     $scope.user="ramji";
     console.log("err called");
}
});