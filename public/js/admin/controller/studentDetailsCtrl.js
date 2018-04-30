app.controller('studentDetailsCtrl',function($scope,adminFact){

    let promise=adminFact.do('../admin/getStudents');
    promise.then((data)=>{
    console.log(data.data.data);
    $scope.studentdata=data.data.data;
    },(error)=>{
    console.log(error);
    });



})