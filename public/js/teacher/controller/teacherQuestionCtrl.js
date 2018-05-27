app.controller('teacherQuestionCtrl',function($scope,teacherFact){
   $scope.questiondiv=false;
    var testid;
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
   $scope.saveQuestion=function(){
       console.log(testid)
       let form=$scope.form;
      // form.queno=queno;
       //form.testid=testid;
       let obj=new objectMaker(form,testid);
       let promise=teacherFact.do('../teacher/saveQuestion',{question:form,testid:testid});
       promise.then(success,fail);
       function success(data){
           console.log(data);
           if(data.data.data=='success')
           {
               $scope.form=""
            alert("question Saved Successfully..!")
           printQue(testid,$scope.testname);
           }
           else if(data.data.data=='session-expired'){
             alert('opps session expired login aganin')
           }
           else{
               alert('Internal Server Error Please try angain..!')
           }
       }
       function fail(err){
           alert("oops somethig went wrong");
       }
   }
   $scope.printQuestions=function(testname,testid1){
    testid=testid1;
    printQue(testid,testname);   
   }
   function printQue(testid,testname){
    $scope.questiondiv=true;
    $scope.chooseTest="";
    $scope.testname=testname;
    let promise=teacherFact.do("../teacher/getQuestions",{testid:testid});
    promise.then(success,fail);
        function success(data){
         console.log(data);
         $scope.questiondata=data.data.data;
         queno=data.data.data.length+1;
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

    function objectMaker(queno,question,optn1,optn2,optn3,optn4,ans,positivemark,negativemark,testid){
        this.queno=queno;
        this.question=question;
        this.optn1=optn1;
        this.optn2=optn2;
        this.optn3=optn3;
        this.optn4=optn4;
        this.ans=ans;
        this.positivemark=positivemark;
        this.negativemark=negativemark;
        this.testid=testid;
    }