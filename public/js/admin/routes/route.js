app.config(function($routeProvider,$locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider.when('/adminLogin',{
        templateUrl:"adminFront/login.html",
        controller:"adminLoginCtrl"
    }).when("/admin_dashboard",{
        templateUrl:"../adminFront/dashboard.html",
        controller:"adminDashCtrl"
    }).when("/teacher",{
        templateUrl:"../adminFront/adteacher.html",
        controller:"adTeacherCtrl"
    }).when("/addstd",{
        templateUrl:"../adminFront/adstudent.html",
        controller:"adStudentCtrl"
    }).when("/addteacher",{
        templateUrl:"../adminFront/adteacher.html",
        controller:"adTeacherCtrl"
    }).when("/operations",{
        templateUrl:"../adOperations.html",
        controller:"adOperationsCtrl"
    }).when('/teachers',{
        templateUrl:'../adminFront/teacherdetail.html',
        controller:'teacherDetailsCtrl'   
    }).when('/students',{
        templateUrl:'../adminFront/studentdetails.html',
        controller:'studentDetailsCtrl'   
    }).otherwise({
        templateUrl:"../adminFront/home.html"
    })
    });