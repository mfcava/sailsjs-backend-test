var AriaApp = angular.module('AriaApp', [ 'ngRoute', 'ngResource','ngStorage','AriaControllers','AriaServices','AriaDirective' ]);


AriaApp.run(['$rootScope','$localStorage', '$location', function($rootScope, $localStorage, $location) {
	if ($localStorage.token) {
		$rootScope.token = $localStorage.token;
	}
	if ($localStorage.currentUser) {
		$rootScope.currentUser = $localStorage.currentUser;
		}
	$rootScope.password = '';
	$rootScope.email    = '';
	$rootScope.location = $location;
});

AriaApp.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
		$routeProvider.
			when('/', {
				templateUrl: '/partials/home.html',
				controller:  'UsersCtrl'
			}).
			when('/user', {
				templateUrl: '/partials/users-list.html',
				controller:  'UsersCtrl'
			}).
			when('/user/:UserId', {
				templateUrl: '/partials/user-details.html',
				controller:  'UserShowCtrl'
			}).
			when('/post', {
				templateUrl: '/partials/posts-list.html',
				controller:  'PostsCtrl'
			}).
			when('/post/:PostId', {
				templateUrl: '/partials/post-details.html',
				controller:  'PostShowCtrl'
			}).
			when('/post/:PostId/edit', {
				templateUrl: '/partials/post-edit.html',
				controller:  'PostEditCtrl'
			}).
			when('/login', {
				templateUrl: '/partials/login.html',
				controller:  'LoginCtrl'
			}).
			when('/logout', {
				templateUrl: '/partials/logout.html',
				controller:  'LogoutCtrl'
			}).
			// --- ---------------------------------------------- ---
			otherwise({
				redirectTo: '/',
				controller: 'AriaCtrl'
			});
	   
			$httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
			   return {
			       'request': function (config) {
			           config.headers = config.headers || {};
			           if ($localStorage.token) {
			               config.headers = {'access_token': $localStorage.token}
			           }
			           return config;
			       },
			       'responseError': function (response) {
			           if (response.status === 401 || response.status === 403) {
			               $location.path('/login');
						   console.log("Protected Resource");
			           }
			           return $q.reject(response);
			       }
			   };
			}]);
			
	} ]);





