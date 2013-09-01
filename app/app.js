'use strict';
var App;

App = angular.module('twoffline', ['ngCookies',
                                       'ngResource',
                                       'twControllers',
                                       'twDirectives',
                                       'twFilters',
                                       'twServices',
                                       'partials'
                                   ]);

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
