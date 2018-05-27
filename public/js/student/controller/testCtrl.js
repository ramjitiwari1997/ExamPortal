app.controller('testCtrl',function($scope,$location,$http,$interval){
    o1= document.getElementById('optn1');
    o2= document.getElementById('optn2');
    o3= document.getElementById('optn3');
    o4= document.getElementById('optn4');
    $scope.nxtbtn=true;
    var change;
    var arr=[];
    var data;
    var form={};
    var x;
    var questions;
    var hour;
    var min;
    var sec;
    var qno=1;
    var qlen;
    var pmark;
    var nmark;
    var totalMark=[];
    $scope.qno=qno;
    var totalSec=0;
    var totalMin=0;
    var storeOptn=[];
    var testname;
    console.log($scope.qno)
    $http.post('/student/getTest').then((data)=>{
        questions=data.data.data.Questions;
        hour=data.data.data.houre;
        min=data.data.data.minute;
        testname=data.data.data.testname;
       // totalSec=hour*3600+min*60;
       totalSec=60;
        qlen=questions.length;
        for(i=1;i<=qlen;i++){
        arr[i-1]=i;
        storeOptn[i-1]='';
    }
        $scope.qno1=arr;

        $scope.que=questions[0].question;
        $scope.optn1=questions[0].optn1;
        $scope.optn2=questions[0].optn2;
        $scope.optn3=questions[0].optn3;
        $scope.optn4=questions[0].optn4;
        $scope.pmark=questions[0].positivemark;
        $scope.nmark=questions[0].negativemark;
        console.log(data.data.data.Questions);
        setTimer();
        reset1();
    },
(err)=>
{

})
$scope.next=function(){
    if(qno>0&&qno<questions.length){
qno++;
$scope.qno=qno;
$scope.que=questions[qno-1].question;
$scope.optn1=questions[qno-1].optn1;
$scope.optn2=questions[qno-1].optn2;
$scope.optn3=questions[qno-1].optn3;
$scope.optn4=questions[qno-1].optn4;
$scope.pmark=questions[qno-1].positivemark;
$scope.nmark=questions[qno-1].negativemark;
tickopn();
btnconfig();
    }
}
$scope.previous=function(){
    if(qno>1&&qno<=questions.length){
    qno--;
    $scope.qno=qno;
    $scope.que=questions[qno-1].question;
    $scope.optn1=questions[qno-1].optn1;
    $scope.optn2=questions[qno-1].optn2;
    $scope.optn3=questions[qno-1].optn3;
    $scope.optn4=questions[qno-1].optn4;
    $scope.pmark=questions[qno-1].positivemark;
    $scope.nmark=questions[qno-1].negativemark;
    tickopn();
    btnconfig();
    }
}
$scope.random=function(data){
    qno=data;
    $scope.qno=qno;
    $scope.que=questions[qno-1].question;
    $scope.optn1=questions[qno-1].optn1;
    $scope.optn2=questions[qno-1].optn2;
    $scope.optn3=questions[qno-1].optn3;
    $scope.optn4=questions[qno-1].optn4;
    $scope.pmark=questions[qno-1].positivemark;
    $scope.nmark=questions[qno-1].negativemark;
    tickopn();
    btnconfig();
    
    
}
$scope.tickMark=function(optn){
    storeOptn[qno-1]=optn;
    }
    function finishTest(){
        $interval.cancel(x);
        let pmark=0,nmark=0,finalmark=0;
        console.log(storeOptn)
        for(i=0;i<storeOptn.length;i++){
             if(storeOptn[i]==questions[i].ans)
             pmark=pmark+parseInt(questions[i].positivemark);
             else if(storeOptn[i]=='');
             else
             nmark=nmark-parseInt(questions[i].negativemark);
        }
        var tmark=nmark+pmark;
        form.testname=testname;
        form.pmark=pmark;
        form.nmark=nmark;
        form.tmark=tmark;
        console.log("Negative Mark Is  "+nmark)
        console.log("Positive Mark Is  "+pmark)
        console.log("Total  Mark Is  "+tmark)
        $http.post('/student/submitTest',{form:form}).then(res=>{
            if(res.data.data=='success'){
                //$location.path('/result/:'+tmark+'/:'+pmark+'/:'+'/:'+nmark)
                $location.path('/result/:'+pmark+'/:'+nmark+'/:'+tmark)
            }
        },fail=>{

        })
    }
    $scope.submitTest=function(){
        finishTest();
    }
    function setTimer(){
     x=$interval(function(){
        totalSec--;
        if(totalSec==0){
            finishTest();
            $interval.cancel(x);
        }
        let hh=totalSec/3600;
        hh=~~hh;
        let hhrem=totalSec%3600;
        let mm=hhrem/60;
        mm=~~mm;
        let ss=totalSec%60;
        if(hh<10)
        hh='0'+hh;
        if(mm<10)
        mm='0'+mm;
        if(ss<10)
        ss='0'+ss;
        $scope.time=hh+':'+mm+':'+ss;
    },1000)
    }
    $scope.reset=function(){
        storeOptn[qno-1]='';
        reset1();
    }
    function reset1(){
     o1.checked=false;
     o2.checked=false;
     o3.checked=false;
     o4.checked=false;
    }
   function tickopn(){
       opn=storeOptn[qno-1];
        if(opn=='')
        reset1();
        else if(opn=='A')
        o1.checked=true;
        else if(opn=='B')
        o2.checked=true;
        else if(opn=='C')
        o3.checked=true
        else if(opn=='D')
        o4.checked=true;
    }
    document.onkeydown = function(e){
    var charCode = e.charCode || e.keyCode || e.which;
        if(charCode == 27){
            finishTest();
     }
    }
    
  var y=  $interval(function(){
        if (!document.fullscreenElement &&    // alternative standard method
            !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
              $interval.cancel(y);
                finishTest();

        }
    },1000)
    function btnconfig(){
        if(qno==1)
        $scope.prebtn=false;
        else
        $scope.prebtn=true;
        if(qno==questions.length)
        {
            $scope.nxtbtn=false;
            $scope.subbtn=true;
        }
        else{
            $scope.nxtbtn=true;
            $scope.subbtn=false;
        }
    }
})

