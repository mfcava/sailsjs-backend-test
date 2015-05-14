var AriaServices  = angular.module('AriaServices', ['ngResource']);
var AriaDirective = angular.module('AriaDirective', []);

	AriaServices.factory('Post', ['$resource',
    	function($resource){
      	  return $resource('/post/:PostId', {}, {
          // query: { method:'GET', params:{PostId:''}, isArray:true }
          });
    }]);


	AriaServices.factory('User', ['$resource',
  		function($resource){
    		return $resource('/user/:UserId', {}, {
      		// query: { method:'GET', params:{UserId:'user'}, isArray:true }
    	});
  	}]);

	AriaServices.factory("flash", [ function($rootScope) {
		var queue = [];
		var currentMessage = "";

		$rootScope.$on("$routeChangeSuccess", function() {
			currentMessage = queue.shift() || "";
		});

		return {
			setMessage: function(message) { queue.push(message); },
	        getMessage: function() { return currentMessage; }
	  	};
	}]);


    /* **************************************************************************
    *****************************************************************************
    *****************************************************************************
    *****************************************************************************
    *****************************************************************************
    ****************************************************************************/

	AriaServices.run(['$rootScope', '$http', function($rootScope, $http) {
	    $rootScope.signIn = function() {
			var formData = {
			    email: $rootScope.email,
			    password: $rootScope.password
			    };
			$http({
				method: 'POST',
				url: '/auth/login', 
				data: formData,
				headers: {'Content-Type': 'application/form-data'}
				}).
					success(function(data, status, headers, config) {
						$rootScope.setToken(data);
						// $scope.token = $localStorage.token;
						// $scope.token = $localStorage.token;
			    	}).
			    	error(function(data, status, headers, config) {
						$rootScope.error = 'Invalid credentials';
			    		// called asynchronously if an error occurs
			    		// or server returns response with an error status.
			    	});
            }
	});

    /* *********************************************************************** */
	
	AriaServices.run([ '$rootScope', '$localStorage', function($rootScope, $localStorage) {
	    $rootScope.setToken = function(data) { 
			$localStorage.token = data.token;
			$localStorage.currentUser = data.user;
			$rootScope.token = data;
			$rootScope.currentUser = data.user;
		}
    } ]);

    /* *********************************************************************** */

	AriaServices.run( [ '$rootScope', '$http', function($rootScope, $http) {
	    $rootScope.signOut = function() {
			$http({
				 method: 'GET',
				    url: '/auth/logout', 
				headers: {'Content-Type': 'application/form-data'}
				}).
					success(function(data, status, headers, config) {
						$rootScope.removeToken(data.token);
						// $scope.token = $localStorage.token;
						// $scope.token = $localStorage.token;
			    	}).
			    	error(function(data, status, headers, config) {
						$rootScope.error = 'Something bad here...';
			    		// called asynchronously if an error occurs
			    		// or server returns response with an error status.
			    	});
            }
	} ]);

    /* *********************************************************************** */
	
	AriaServices.run([ '$rootScope', '$localStorage', function($rootScope, $localStorage) {
	    $rootScope.removeToken = function(data) { 
			delete $localStorage.token;
			delete $rootScope.token;
		}
    } ]);



	AriaServices.directive('ngEnter', [ function () {
	    return function (scope, element, attrs) {
	        element.bind("keydown keypress", function (event) {
	            if(event.which === 13) {
	                scope.$apply(function (){
	                    scope.$eval(attrs.ngEnter);
	                });

	                event.preventDefault();
	            }
	        });
	    };
	} ]);



    /* **************************************************************************
    *****************************************************************************
    *****************************************************************************
    *****************************************************************************
    *****************************************************************************
    *************************************************************************** 

   AriaServices.factory('Auth', ['$http', '$localStorage', 'urls', function ($http, $localStorage, urls) {
       function urlBase64Decode(str) {
           var output = str.replace('-', '+').replace('_', '/');
           switch (output.length % 4) {
               case 0:
                   break;
               case 2:
                   output += '==';
                   break;
               case 3:
                   output += '=';
                   break;
               default:
                   throw 'Illegal base64url string!';
           }
           return window.atob(output);
       }

       function getClaimsFromToken() {
           var token = $localStorage.token;
           var user = {};
           if (typeof token !== 'undefined') {
               var encoded = token.split('.')[1];
               user = JSON.parse(urlBase64Decode(encoded));
           }
           return user;
       }

       var tokenClaims = getClaimsFromToken();

       return {
           signup: function (data, success, error) {
               $http.post(urls.BASE + '/auth/login', data).success(success).error(error)
           },
           signin: function (data, success, error) {
               $http.post(urls.BASE + '/auth/login', data).success(success).error(error)
           },
           logout: function (success) {
               tokenClaims = {};
               delete $localStorage.token;
               success();
           },
           getTokenClaims: function () { return tokenClaims; }
       };
   }
   ]);
   
   
   AriaDirective.factory('Data', ['$http', 'urls', function ($http, urls) {
       return {
           getRestrictedData: function (success, error) {
               $http.get(urls.BASE + '/restricted').success(success).error(error)
           },
           getApiData: function (success, error) {
               $http.get(urls.BASE_API + '/restricted').success(success).error(error)
           }
       };
   }
   ]);

    ** **************************************************************************
    *****************************************************************************
    *****************************************************************************
    *****************************************************************************
    *****************************************************************************
    ************************************************************************** */

