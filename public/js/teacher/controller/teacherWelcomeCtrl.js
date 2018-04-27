app.controller("teacherDashboardCtrl",function($scope,$rootScope,teacherFact,$location){
    $scope.show=false;
     let promise=teacherFact.do('teacher/getData',{});
     promise.then(success,fail);
    function success(data){
        console.log(data);
        if(data.data.data=="session-expired"){
           $location.url("/teacherLogin")
        }
        else{
            var obj={data:[{name:"Tests",url:"#tests"},{name:"Questions",url:"#addQuestion"}]};
              $rootScope.data=obj.data;
        $scope.teachername="welcome "+data.data.data;
        $scope.show=true;
        }
    }
    function fail(err){
        console.log("cant load data");
    }
})