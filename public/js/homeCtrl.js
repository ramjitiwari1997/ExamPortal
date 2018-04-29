app.controller("homeCtrl",function($rootScope){
  var obj={data:[{name:"Home",url:"#"},{name:"About Us",url:"#"}]};
  $rootScope.data=obj.data;
});
app.config(function($routeProvider,$locationProvider){
    $locationProvider.hashPrefix('');
    
        $routeProvider.when('/',{
            templateUrl:"home.html",
        }).when('/about',{
            templateUrl:"about.html",
        }).otherwise({template:"Error Page, No match Found",redirectTo:"/"});
        
    });