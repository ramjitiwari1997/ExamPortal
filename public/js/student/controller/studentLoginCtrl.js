app.controller("studentLoginCtrl",function($scope,studentFac){

    $scope.doLogin=function(){
        let id=$scope.form.uname;
        let password=$scope.form.psw;
        console.log(password);
        let promise=studentFac.checkLogin(id,password);
        promise.then(success,fail);  
        function success(data){
            if(data.status==200){
               window.location='/welcome';
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