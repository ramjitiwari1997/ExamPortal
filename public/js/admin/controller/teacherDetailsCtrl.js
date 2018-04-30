app.controller('teacherDetailsCtrl',function($scope,adminFact){
    let promise=adminFact.do('../admin/getTeachers');
    promise.then((data)=>{
    console.log(data.data.data);
    $scope.teacherdata=data.data.data;
    },(error)=>{
    console.log(error);
    });
})