// ---- ------------------------------------------------------------------- ---
// ----                                                                     ---
// ---- Init Controllers                                                    ---
// ----                                                                     ---
// ---- ------------------------------------------------------------------- ---
var AriaControllers = angular.module('AriaControllers', ['flow']);



















// ---- ------------------------------------------------------------------- ---
// ----                                                                     ---
// ---- User Controller                                                     ---
// ----                                                                     ---
// ---- ------------------------------------------------------------------- ---

AriaControllers.controller('UsersCtrl', ['$scope', 'User', function($scope, User) {
  $scope.users = User.query();
}]);

AriaControllers.controller('UserShowCtrl', ['$scope', '$routeParams', 'User', function($scope, $routeParams, User) {
  $scope.user = User.get({UserId: $routeParams.UserId});
}]);




















// ---- ------------------------------------------------------------------- ---
// ----                                                                     ---
// ---- Post Controller                                                     ---
// ----                                                                     ---
// ---- ------------------------------------------------------------------- ---










// ---- ------------------------------------------------------------------- ---
// ---- /post/ Controller                                                   ---
// ---- ------------------------------------------------------------------- ---
AriaControllers.controller('PostsCtrl', ['$scope', 'Post', function($scope, Post) {
  $scope.postPreviewLimit = 150;
  $scope.currentPage = 0;
  $scope.elementInPage = 3;
  $scope.sortBy = 'createdAt DESC';
  $scope.pageNumber = Math.ceil((Post.query.length) / $scope.elementInPage);
  $scope.latestPost = Post.query({skip: 0 ,limit: 1, sort: $scope.sortBy } );
  $scope.posts = Post.query({skip: $scope.currentPage*$scope.elementInPage+1 ,limit: $scope.elementInPage, sort: $scope.sortBy } );
  
  $scope.changeImageName = function (message) {
  		var f = jQuery.parseJSON(message.substr(message.indexOf("[")+1,message.lastIndexOf("]")-1));
		$scope.post.coverImage = f.fd.split("/").pop() //prevent file from uploading
		flash.setMessage("Uploaded: "+ $scope.post.coverImage);
		currentMessage = queue.shift() || "";
  };
  
  $scope.setPage = function (pageNumber) {
	  if (pageNumber !== undefined) {
		  if (pageNumber == 'next') {
		  	 $scope.currentPage = $scope.currentPage+1;
		  } else if ( pageNumber == 'prev' && $scope.currentPage > 0)  {
		  	 $scope.currentPage = $scope.currentPage-1;
		  } else if ( pageNumber == 'prev' && $scope.currentPage == 0)  {
		  		  	 $scope.currentPage = 0;
		  } else {
		     $scope.currentPage = pageNumber;	
		  }
	  } else {
	    $scope.currentPage = $scope.currentPage + 1;
	  }
	$scope.posts = Post.query({skip: $scope.currentPage*$scope.elementInPage+1,limit: $scope.elementInPage, sort: $scope.sortBy } );
  };
  
  $scope.getPostsNumber = function(pageNumber){
       return new Array(pageNumber);
  };
  
  
  $scope.MailSubscribe = function () {

  };
  
}]);










// ---- ------------------------------------------------------------------- ---
// ---- /post/:id Controller                                                ---
// ---- ------------------------------------------------------------------- ---
AriaControllers.controller('PostShowCtrl', ['$scope', '$routeParams', 'Post', 'flash', function($scope, $routeParams, Post, flash) {
  $scope.flash = flash;
  $scope.post = Post.get({PostId: $routeParams.PostId});
  // callback for ng-click 'deletePost':
  $scope.deletePost = function (PostId) {
  	Post.delete({ id: PostId });
    $scope.post = Post.query();
    };
}]);










// ---- ------------------------------------------------------------------- ---
// ---- /post/:id/edit Controller                                           ---
// ---- ------------------------------------------------------------------- ---
AriaControllers.controller('PostEditCtrl', ['$scope', '$routeParams', 'Post', '$location', 'flash', '$http', function($scope, $routeParams, Post, $location, flash, $http ) {
	$scope.flash = flash;
	$scope.post = Post.get({PostId: $routeParams.PostId});
	$scope.autocompleteTags = false;
	$scope.searchTag = '';
	
    // callback for ng-click 'deletePost':
    $scope.deletePost = function () {
      	$scope.post.$delete({ PostId: $scope.post.id });
    };
		
    $scope.changeImageName = function (message) {
		var f = jQuery.parseJSON(message.substr(message.indexOf("[")+1,message.lastIndexOf("]")-1));
		$scope.post.coverImage = f.fd.split("/").pop() //prevent file from uploading
		flash.setMessage("Uploaded: "+ $scope.post.coverImage);
		currentMessage = queue.shift() || "";
    };
	
	
    // callback for ng-click 'deletePost':
    $scope.savePost = function () {
		$scope.post.$save({ PostId: $scope.post.id });
		flash.setMessage("Saved!");
		$location.path("/post/"+$routeParams.PostId);
    };	  





	// ---- ------------------------------------------------------------------- ---
	// ---- /post/:id/edit HELPERS                                              ---
	// ---- ------------------------------------------------------------------- ---
	$scope.removeTag = function (TagID) { 
		io.socket.delete("/post/"+$scope.post.id+"/tags/"+TagID, function (resData) {
			if (typeof resData !== 'undefined' ){
				$scope.post.tags = resData.tags;
				$scope.$apply();
			} else {
				console.log('$scope.findTag > resData:'+resData);
				}
			});
	};
	
	$scope.addNewTag = function (TagName) { 
	  	io.socket.post("/post/"+$scope.post.id+"/tags/", { name: TagName }, function (resData) {
			if (typeof resData !== 'undefined' ){
				$scope.post.tags = resData.tags;
				$scope.$apply();
			} else {
			  	console.log('$scope.findTag > resData:'+resData);
			}
		});
	};
	
	$scope.addTag = function (TagID) { 
	  	io.socket.post("/post/"+$scope.post.id+"/tags/"+TagID, function (resData) {
			if (typeof resData !== 'undefined' ){
				$scope.post.tags = resData.tags;
				$scope.$apply();
			} else {
			  	console.log('$scope.findTag > resData:'+resData);
			}
		});
	};
	
	$scope.findTag = function (TagName) { 
		if (TagName != '') {
	  		io.socket.get("/post/findbytagname?name="+TagName, function (resData) {
				if (typeof resData !== 'undefined' ){
					$scope.autocompleteTags = resData;
					$scope.$apply();
				} else {
			  		console.log('$scope.findTag > resData:'+resData);
				}
			});
		} else {
			console.log('$scope.findTag: false');
			$scope.autocompleteTags = false;
		}
	};

}]);




















// ---- ------------------------------------------------------------------- ---
// ----                                                                     ---
// ---- Login / Logout Controller                                           ---
// ----                                                                     ---
// ---- ------------------------------------------------------------------- ---
AriaControllers.controller('LoginCtrl', ['$rootScope', '$scope', '$routeParams', '$location', 'flash', function($rootScope, $scope, $routeParams, $location, flash) {
	$scope.flash = flash;
	$rootScope.signOut();
	
}]);

AriaControllers.controller('LogoutCtrl', ['$rootScope', '$scope', '$routeParams', '$location', 'flash', function($rootScope, $scope, $routeParams, $location, flash) {
	$scope.flash = flash;
	$rootScope.signOut();
	flash.setMessage("Disconnected");
}]);


