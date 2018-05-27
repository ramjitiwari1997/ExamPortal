app.controller('logoutCtrl',function($scope,studentFac){
    console.log('loded')
    let promise=studentFac.do('/logout',{})
    promise.then(data=>{
        console.log(data)
        if(data.data.data=='success')
        location.reload();
        else
        alert('Cant logout..');
    },fail=>{})
})