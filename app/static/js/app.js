'use strict';
angular.module('WishList', ['ui.router', 'toaster','ngAnimate',

     
     'satellizer', 
     'WishList.home1'
     
     //'WishList.modal'
     
    /* 'WishList.logout'*/])
 
    .config(['$stateProvider',function($stateProvider, $urlRouterProvider, $authProvider) {
      //  $urlRouterProvider.otherwise('/' );
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
  //});
   

