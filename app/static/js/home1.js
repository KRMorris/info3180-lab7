'use strict';

angular.module('WishList.home1', ['ui.router','toaster','ngAnimate','satellizer'])

.config(['$stateProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('search',{
    url:'/', 
    templateUrl: '../static/home1.html',
    controller: 'home1Controller',
    data: {restrictedLogin: false}
  });
}])

.controller('home1Controller', [
    '$scope','$state', '$http', 'AuthService','toaster',
    //'$interpolateProvider',
    function($scope,$state,$http,AuthService ,toaster,$auth) {
        
        
        $scope.imgList=[];
        $scope.getimg={};
        /*$scope.$log = $log;
        var myobj=localStorage.getItem('sesu');//sesu.username;
        var un=JSON.parse(myobj);
        $scope.username=un["username"];
        var ID=un["userID"];*/
        //console.log($scope.username);
        $scope.Wldecr='';
        $scope.selectedIndex = null;
        
        
        $scope.getImg = function(){
            if(!$scope.s_url)
            {
                          alert("urlrequired");
                      }
            $http.post('/api/thumbnails',{url:$scope.s_url})
                    .success(function(data){
                        if(data.message){
                            //log(data);
                    $scope.getimg = data.thumbnails;
                      toaster.pop({
                                type:'wait',
                                title:'Retrieving thumbnails from external link',
                                //body:'Error retrieving thumbnails.',
                                timeout: 30000
                                //showCloseButton: true
                            });
                        }
                        else{
                            //log(data);
                            //alert('error1');
                            toaster.pop({
                                type:'error',
                                title:'Error',
                                body:'Error retrieving thumbnails.',
                                timeout: 0,
                                showCloseButton: true
                            });
                        }
                    
                        })
                                .error(function(data){
                                    //log(data);
                                            //alert('error');
                                toaster.pop({
                                type:'error',
                                title:'Server Error',
                                body:'Error retrieving thumbnails.',
                                timeout: 0,
                                showCloseButton: true
                            });
                        
            });
        };
        
    
        
        
        $scope.setUrl= function(imgUrl) {
	       $scope.selImg = imgUrl;
               
        };
  
       
       
        
    
}])
.run(function ($rootScope, $state, $auth) {
  $rootScope.$on('$stateChangeStart',
    function (event, toState) {
      var requiredLogin = false;
      if (toState.data && toState.data.requiredLogin)
        requiredLogin = true;

      if (requiredLogin && !$auth.isAuthenticated()) {
        event.preventDefault();
        $state.go('login');
      }
    });
});

