'use strict';
angular.module('myApp', [
  'ngRoute', 'ngResource', 'ngAnimate', 'PaginatorService'
]).
config([ '$routeProvider', function( $routeProvider) {
  $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'mainCtrl'
      })
      .otherwise({
        redirectTo: '/main'
      });
}]);
