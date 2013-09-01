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
		}).when('/foo', {
			templateUrl: '/partials/foo.html'
		}).when('/about', {
			templateUrl: '/partials/about.html'
		}).otherwise({
			redirectTo: '/list'
		});
		return $locationProvider.html5Mode(false);
	}
]);
