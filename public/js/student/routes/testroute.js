app.config(function($routeProvider,$locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider.when('/',{
        templateUrl:'../studentFront/permission.html',
        controller:'prmisnCtrl'
    }).when("/ok",{
        templateUrl:"../studentFront/test.html",
        controller:"testCtrl"
    }).when('/result/:param1/:param2/:param3',{
         templateUrl:"../studentFront/result.html",
         controller:'resultCtrl'
    }).otherwise(
        {template:"Error Page, No match Found",redirectTo:"/"});
    
});



