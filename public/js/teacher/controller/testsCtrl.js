app.controller('testsCtrl',function($scope,teacherFact){
    let promise=teacherFact.do('../teacher/getTests',{});
    promise.then(data=>{
        $scope.tests=data.data.data;
    },fail=>{

    })
})