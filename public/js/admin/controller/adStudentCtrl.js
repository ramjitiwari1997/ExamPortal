app.controller('adStudentCtrl',function($scope,adminFact){
    var form;
    $scope.addstd=function(){
        form=$scope.form;
       console.log(form);
       let promise=adminFact.do('../admin/addstd',form);
       promise.then(success,fail);
      function success(data){
           console.log(data);  
       }
       function fail(data){
           console.log(data);
       }
    }
    });