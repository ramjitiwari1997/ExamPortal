app.config(function($routeProvider,$locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider.when("/TeacherRegistration",{
        templateUrl:"teacherFront/teacherReg.html",
        controller:"teacherRegCtrl"
    }).when('/teacherLogin',{
    templateUrl:"teacherFront/teacherLogin.html",
        controller:"teacherLoginCtrl" 
    }).when('/dashboard',{
        templateUrl:"teacherFront/welcome.html",
        controller:"teacherDashboardCtrl"
        
    })  
});