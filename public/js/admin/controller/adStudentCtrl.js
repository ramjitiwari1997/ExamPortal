app.controller('adStudentCtrl',function($scope,adminFact){
    var form;
    $scope.addstd=function(){
        form=$scope.form;
       console.log(form);
       let promise=adminFact.do('../admin/addstd',form);
       promise.then(success,fail);
      function success(data){
        if(data.data.data=='success')
        alert('added successully....')
        else if(data.data.data==='exists')
            alert('opps mail already exits');
      
        else if(data.data.data=='session-expired')
        {
            alert('oops session expired')
            location.reload();
        }
        else{
            alert('server error')
            location.reload();
        }
       }
       function fail(data){
           
       }
    }
    });