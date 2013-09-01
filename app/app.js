'use strict';
var App;

App = angular.module('app', ['ngCookies', 'ngResource', 'app.controllers', 'app.directives', 'app.filters', 'app.services', 'partials']);

App.config([
	'$routeProvider', '$locationProvider', function($routeProvider, $locationProvider, config) {
		$routeProvider.when('/list', {
			templateUrl: '/partials/list.html'
		}).when('/view1', {
			templateUrl: '/partials/partial1.html'
		}).when('/about', {
			templateUrl: '/partials/about.html'
		}).otherwise({
			redirectTo: '/list'
		});
		return $locationProvider.html5Mode(false);
	}
]);
