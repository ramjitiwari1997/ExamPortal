app.controller('testresultCtrl',function($scope,teacherFact){
let promise=teacherFact.do('../teacher/getTests',{});
promise.then(data=>{
    $scope.tests=data.data.data;
},fail=>{
    alert('Internal server Error!')
})

$scope.printresult=function(testid){
    let promise=teacherFact.do('../teacher/getResults',{testid:testid})
    promise.then(data=>{
      $scope.results=data.data.data;
    },fail=>{
     alert('Internal Server Error !');
    })
}
})