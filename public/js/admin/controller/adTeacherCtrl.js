app.controller('adTeacherCtrl',function($scope,adminFact){
    var form;
    $scope.add=function(){
        form=$scope.form;
       console.log(form);
       let promise=adminFact.do('../admin/addteacher',form);
       promise.then(success,fail);
      function success(data){
           console.log(data);  
       }
       function fail(data){
           console.log(data);
       }
    }
    });