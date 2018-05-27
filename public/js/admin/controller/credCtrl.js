app.controller('credCtrl',function($scope,adminFact){
$scope.reset=function(){
    let promise=adminFact.do('/admin/reset',$scope.form)
    promise.then(data=>{
        if(data.data.data=='success'){
            alert('Username and password changed successfuly..')
            location.reload();
        }
        else{
            alert('oops cant change')
        }
    })
}
})