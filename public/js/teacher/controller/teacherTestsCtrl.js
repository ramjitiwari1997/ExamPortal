app.controller('teacherTestsCtrl',function($scope,teacherFact){
    printTest()
    $scope.saveTest=function(){
    let testname=$scope.testname;
    let houre=$scope.houre;
    let minute=$scope.minute
    let obj=new objectMaker1(testname,houre,minute);
    var promise=teacherFact.do('../teacher/saveTest',obj);
    promise.then(success,fail);
    function success(data){
        if(data.data.data=="success"){
            alert("saved");
            printTest();

        }
        else{
            alert("cant save");
        }
    }
    function fail(err){
        alert("oops some error takes place");
    }
    }
    function printTest(){
        var dataprpmise=teacherFact.do('../teacher/getTests',{});
        dataprpmise.then(dataSuccess,dataFail);
        function dataSuccess(data){
            if(data.data.data=="session-expired"){
                alert("oops session expired");
            }
            else{
        console.log(data.data.data);
        $scope.testdata=data.data.data;
            }
        }
        function dataFail(err){
        console.log(err);
        }
    }
    $scope.delete=function(name){
        let promise=teacherFact.do('../teacher/deleteTest',{testname:name});
        promise.then(success,fail);
        function success(data){
            if(data.data.data=="success"){
                printTest();
                alert("test deleted.......");
            }
            else if(data.data.data=="error"){
                alert("oops something went wrong");
            }
            else if(data.data.data=="session-expired"){
                alert("oops session expired");
            }
        }
        function fail(data){
            alert("oops something damaged");
        }
    }
    $scope.edit=function(name){
        alert(" editing...."+name);
    }
    $scope.publish=function(name){
        alert("publishing....."+name);
    }
    });




    function objectMaker1(testname,houre,minute){
        this.testname=testname;
        this.houre=houre;
        this.minute=minute
    }