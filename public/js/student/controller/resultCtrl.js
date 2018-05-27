app.controller('resultCtrl',function($scope,$routeParams){
let pmark=$routeParams.param1;
let nmark=$routeParams.param2;
let tmark=$routeParams.param3;
$scope.pmark=pmark;
$scope.tmark=tmark;
$scope.nmark=nmark;
$scope.exit=function(){
    if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      window.open('', '_self', ''); window.close();
}
})