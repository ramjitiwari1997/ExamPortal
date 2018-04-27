app.factory('adminFact',function($http,$q){
    var object={
        do:function(path,form){
         let pr=$q.defer();
         $http.post(path,{form:form}).then(success,fail);
         function success(data){
             pr.resolve(data);
         }
         function fail(error){
             pr.reject(error);
         }
         return pr.promise;
        },
    }
    return object;
});