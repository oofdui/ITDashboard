angular.module("default").controller("DefaultController",[
	"$scope","$http","$state","$location","$mdSidenav","$mdUtil","$log","$mdToast",
	function($scope,$http,$state,$location,$mdSidenav,$mdUtil,$log,$mdToast){

		//Hide or Show the 'left' sideNav area
		$scope.toggleMenu = function(){
			$mdSidenav("left")
				.toggle()
				.then(function(){
					$log.debug("Toggle : " + "left is done");
				});
		};
		$scope.isMenuActive = function(stateName){
			if($state.current.name == stateName){
				return true;
			}
			else{
				return false;
			}
		};
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