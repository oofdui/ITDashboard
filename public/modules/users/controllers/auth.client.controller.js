angular.module("users").controller("AuthController",[
"$scope","$http","$state",
function($scope,$http,$state){
	$scope.signup = function(isValid){
		if(isValid){
			$http.post("/signup",$scope.user)
				.success(function(response){
					$state.go("home");
				})
				.error(function(response){
					$state.error = response.message;
				});
		}
		else{
			alert("Invalid");
		}
	};
	$scope.login = function(isValid){
		if(isValid){
			$http.post("/login",$scope.user)
				.success(function(response){
					$state.go("home");
				})
				.error(function(response){
					$state.error = response.message;
				});
		}
		else{
			alert("Invalid");
		}
	};
}
]);