app.controller('logoutCtrl',function($scope,adminFact){
    let promise=adminFact.do('/logout',{})
    promise.then(data=>{
        console.log(data)
        if(data.data.data=='success')
        location.reload();
        else
        alert('Cant logout..');
    },fail=>{})
})