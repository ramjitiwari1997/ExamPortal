app.config(function($routeProvider,$locationProvider){
    $locationProvider.hashPrefix('');
    
    
    $routeProvider.when('/',{
        templateUrl:'../studentFront/home.html'
    }).when("/StudentRegistration",{
        templateUrl:"studentFront/studentReg.html",
        controller:"studentRegCtrl"
    }).when('/testlogin',{

                templateUrl:'../studentFront/testlogin.html',
                controller:'testloginCtrl'
            }).when('/logout',{
                templateUrl:'../studentFront/logout.html',
                controller:'logoutCtrl'
            }).when('/mytests',{

                templateUrl:'../studentFront/mytest.html',
                controller:'mytestCtrl'
            })
            .otherwise({template:"Error Page, No match Found",redirectTo:"/"});
    
});



