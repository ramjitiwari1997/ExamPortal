app.config(function($routeProvider,$locationProvider){
    $locationProvider.hashPrefix('');
    
    
    $routeProvider.when("/StudentRegistration",{
        templateUrl:"studentFront/studentReg.html",
        controller:"studentRegCtrl"
    }).when('/studentLogin',{
            templateUrl:"studentFront/studentLogin.html",
            controller:"studentLoginCtrl"
            }).otherwise({template:"Error Page, No match Found",redirectTo:"/"});
    
});



