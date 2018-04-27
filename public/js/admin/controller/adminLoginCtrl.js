app.controller('adminLoginCtrl',function($scope,$location,adminFact){
   $scope.doLogin=function(){
    let form=$scope.form;
    console.log(form.uname);
    let promise=adminFact.do('admin/doLogin',form);
    promise.then(success,fail);
    function success(data){
        console.log(data.data.data);
    if(data.data.data=="success"){
        window.location="admin/dashboard";
    }
    else if(data.data.data=="wrong"){
        $scope.error="invalid username or password";
    }
    else{
        $scope.error="oops something went wrong please try after some time";
    }
    }
    function fail(err){
        $scope.error="oops internal server error";
    }
}
});