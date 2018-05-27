app.controller('testloginCtrl',function($scope,studentFac){
    $scope.checktest=function(){
        studentFac.do('/student/studetTestLogin',{testid:$scope.passkey}).then((data)=>{
                  console.log(data);
                  if(data.data.data==="success"){
                      window.open("/student/tests", "name", "fullscreen=yes,top=0,left=0,width=" + window.screen.width + ",height=" + window.screen.height);
                      window.close();
                    }
                    else if(data.data.data=='taken'){
                        alert('You have already taken this test...!')
                    }
                    else if(data.data.data=='session-expired')
                    location.reload();
                  else{
                      $scope.resultspan="oops passkey is wrong"
                  }
        },(fail)=>{
                 alert("oops something went wrong please try again !");
        })
    }

})