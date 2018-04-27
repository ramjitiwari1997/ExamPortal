app.controller('teacherQuestionCtrl',function($scope,teacherFact){
   $scope.questiondiv=false;
    var testnme;
    var queno=-1;
   let promise=teacherFact.do('../teacher/getTests',{});
   promise.then(success,fail);
   function success(data){
       if(data.data.data.length==0){
           console.log(data.data.data);
        $scope.chooseTest="OOPS YOU HAVE NO TEST ADDED..";
       }
       else{
        $scope.chooseTest="CHOOSE TEST....";
         $scope.data=data.data.data;
         console.log(data.data.data);
       }
   }
   function fail(err){
       alert("oops something went wrong");
   }
   $scope.saveQuestion=function(testname){
       let form=$scope.form;
       form.queno=queno;
       let obj=new objectMaker(form.queno,form.question,form.optn1,form.optn2,form.optn3,form.optn4,form.ans,form.positivemark
    ,form.negativemark,testnme);
       let promise=teacherFact.do('../teacher/saveQuestion',obj);
       promise.then(success,fail);
       function success(data){
           console.log(data);
           printQue(testnme);
           //$scope.form="";
       }
       function fail(err){
           alert("oops somethig went wrong");
       }
   }
   $scope.printQuestions=function(testname1){
    printQue(testname1);   
   }
   function printQue(testname1){
    $scope.questiondiv=true;
    $scope.chooseTest="";
    testnme=testname1;
    $scope.testname=testnme;
    let promise=teacherFact.do("../teacher/getQuestions",{testname:testname1});
    promise.then(success,fail);
        function success(data){
         console.log(data.data.data);
         $scope.questiondata=data.data.data.Questions;
         queno=data.data.data.Questions.length+1;
        }
        function fail(err){
            alert("oops cant get data.");
        }
   }
   $scope.edit=function(queno){
       alert("EDITING...."+ queno);
       $scope.form.question="editing start";
    }
   $scope.delete=function(queno){
       alert("deleting..."+queno);
   }
    });

    function objectMaker(queno,question,optn1,optn2,optn3,optn4,ans,positivemark,negativemark,testname){
        this.queno=queno;
        this.question=question;
        this.optn1=optn1;
        this.optn2=optn2;
        this.optn3=optn3;
        this.optn4=optn4;
        this.ans=ans;
        this.positivemark=positivemark;
        this.negativemark=negativemark;
        this.testname=testname;
    }