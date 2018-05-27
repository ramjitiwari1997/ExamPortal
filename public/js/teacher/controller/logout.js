app.controller('logoutCtrl',function($scope,teacherFact){
    console.log('loded')
    let promise=teacherFact.do('/logout',{})
    promise.then(data=>{
        console.log(data)
        if(data.data.data=='success')
        location.reload();
        else
        alert('Cant logout..');
    },fail=>{})
})