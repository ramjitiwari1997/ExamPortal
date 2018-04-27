app.controller('teacherRegCtrl',function($scope,teacherFact){
    $scope.doRegistration=function(){
        var form=$scope.form;
        console.log(form.password+"   "+form.passwordrepeat)
        let pass1=form.password;
        let pass2=form.passwordrepeat;
        if(pass1!=pass2){
                $scope.form.passwordrepeat="";
                $scope.pswrepeaterr="password didn't match";
            
        }
        else{
            let promise=teacherFact.do('teacher/doRegistration',form);
            promise.then(success,fail);
            function success(data){
                if(data.data.data=="error"){
                    alert("oops can't register");
                }
                else if(data.data.data=="success"){
                    alert("data saved successfully");
                }
                else{
                    alert("something went wrong");
                }
               console.log(data.data.data);
            }
            function fail(err){    
            }
        }
    }
});