app.controller('prmisnCtrl',function($scope,$location,$http){
    $scope.testOk=function(){
        console.log("suvccessnjl");
        $location.path('/ok')
        $location.replace();

        if (!document.fullscreenElement &&    // alternative standard method
            !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
          } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
          } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
          } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
          }
        }
    }
document.addEventListener('contextmenu', event => event.preventDefault()); 
document.onkeydown = function(e) {
    console.log(event.keyCode)
if(event.keyCode == 123) {
return false;
}
if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
return false;
}
if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
return false;
}
if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
return false;
}
var charCode = e.charCode || e.keyCode || e.which;
    if(charCode == 27){
        alert('not esc')
    return false;
 }
}
})