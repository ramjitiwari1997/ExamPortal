app.controller('mytestCtrl',function($scope,$http){
    $http.post('/student/testDetails',{}).then(data=>{
    $scope.tests=data.data.data;
    },fail=>{
    alert('Oops Internal Server Error!')
    })
})