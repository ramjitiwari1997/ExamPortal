app.controller("studentRegCtrl",function($scope,studentFac){
 $scope.doRegistration=function(){
     let form=$scope.form;
     if(form.psw!=form.pswrepeat){
         $scope.form.pswrepeat="";
         $scope.pswrepeaterr="password didint match";
     }
     else{
        let promise=studentFac.doReg(form);
        promise.then(success,fail);
        function success(data){

        }
        function fail(err){
            
        }

         
     }
 }
    
});