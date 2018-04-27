app.factory("studentFac",function($http,$q){
var object={
    checkLogin:function(id,password){
        let pr=$q.defer();
        $http.post("student/doLogin",{id:id,password:password}).then(success,fail);
        function success(data){
        pr.resolve(data);
        }
        function fail(err){
            pr.reject(err);
        }
       return pr.promise;
    },

doReg:function(form){

},

}
return object;
});