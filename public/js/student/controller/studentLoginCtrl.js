app.controller("studentLoginCtrl",function($scope,studentFac){

    $scope.doLogin=function(){
        let promise=studentFac.do('/student/doLogin',$scope.form);
        promise.then(success,fail);  
        function success(data){
            if(data.data.data==="success"){
               window.location='/student/dashboard';
            }
            else{
                $scope.pwserro="invalid userid or password";
                $scope.form.uname="";
                $scope.form.psw="";
            }
        }
        function fail(err){
            console.log(err);
        }
    }
});