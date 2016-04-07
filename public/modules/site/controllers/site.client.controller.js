var app = angular.module("site",["ui.bootstrap"]);

app.controller("DialogController",["$scope","$http","$mdDialog",function($scope,$http,$mdDialog) {
	//alert(JSON.stringify($scope.objectsUpdate));
	if(Object.keys($scope.objectsUpdate).length){
		$scope.uidUpdate = $scope.objectsUpdate.uid;
		$scope.statusflagUpdate = $scope.objectsUpdate.statusflag;
		$scope.codeUpdate = $scope.objectsUpdate.name;
		$scope.nameUpdate = $scope.objectsUpdate.detail;
		//$scope.forms.code = $scope.objectsUpdate.name;
		//$scope.forms.name = $scope.objectsUpdate.detail;
	}
	else{
		$scope.uidUpdate = "";
		$scope.statusflagUpdate = "A";
		$scope.codeUpdate = "";
		$scope.nameUpdate = "";
	}
	$scope.OK = function(){
		$mdDialog.hide();
	};
	$scope.Cancel = function(){
		$mdDialog.hide();
	};
	$scope.Submit = function() {
		if(Object.keys($scope.objectsUpdate).length){
			//alert("UPDATE : " + JSON.stringify($scope.forms,null,4));return;
			$http.post("/site/update",$scope.forms)
				.success(function(data){
					$scope.results.length = 0;
					$scope.results.push.apply($scope.results,data.results)
					$mdDialog.hide();
				})
				.error(function(err){
					$log.error(err);
					$scope.message = err;
					alert(JSON.stringify(err,null,4));
				});
		}
		else{
			//alert("INSERT : " + JSON.stringify($scope.forms,null,4));return;
			$http.post("/site/insert",$scope.forms)
				.success(function(data) {
					$scope.header = data.header;
					$scope.results.length = 0;
					$scope.results.push.apply($scope.results,data.results)
					$scope.forms.code = "";
					$scope.forms.name = "";
					//$scope.formDefault.$setValidity();//Clear Validate
					//$scope.formDefault.$setPristine();//Reset Invalid Checker
					//$scope.formDefault.$setUntouched();//Clear Touched

					$mdDialog.hide();
				})
				.error(function(err) {
					$log.error(err);
					$scope.message = err;
					alert(JSON.stringify(err,null,4));
				});
		}
	};
}]);

app.controller("SiteController",["$scope", "$http", "$log", "$mdDialog", "$mdToast", function($scope, $http, $log, $mdDialog, $mdToast) {

	$http.get("/site/select")
		.success(function(data) {
			this.title = data.title;
			$scope.header = data.header;
			$scope.results = data.results;
		})
		.error(function(err) {
			$log.error(err);
		});

	$scope.closeDialog = function() {
		$mdDialog.hide();
	};
	var displayToast = function(type,message){
		var icon = "";
		if(type=="success"){
			icon = "<md-icon style='color:#2ECC71;'>done</md-icon>";
		}
		else if(type == "fail"){
			icon = "<md-icon style='color:#E74C3C;'>clear</md-icon>";
		}
		var template = "<md-toast>" +
							icon +
		  					"<span class='md-toast-text' flex>" + message + "</span>" +
						"</md-toast>";
		
		$mdToast.show({
	        template: template,
	        hideDelay: 3000,
	        position: "top right"
	    });
	};
    $scope.ShowModalInsert = function($event){
    	alert("Enter Insert");
    	$scope.objectsUpdate = [];
		$mdDialog.show({
			clickOutsideToClose: true,
			parent: angular.element(document.body),
			targetEvent: $event,
			templateUrl:"/modules/site/views/site.dialog.client.view",
			controller: "DialogController",
			scope:$scope
		});
    };
    $scope.ShowModalUpdate = function(objects,$event){
    	alert("Enter Update");
        $scope.objectsUpdate = objects;
        $mdDialog.show({
			clickOutsideToClose: true,
			parent: angular.element(document.body),
			targetEvent: $event,
			templateUrl:"/modules/site/views/site.dialog.client.view",
			controller: "DialogController",
			scope:$scope
		});
    };
    $scope.UpdateStatusFlag = function(uid,name,statusflag){
    	$http.post("/site/updateStatusFlag",{"uid":uid,"statusflag":statusflag})
    		.success(function(data){
    			$scope.results = data.results;
    			displayToast("success", name + " : Update StatusFlag Success!!!");
    		})
    		.error(function(err){
    			$scope.message = err;
    			displayToast("fail", name + " : Update StatusFlag Fail!!! : " + err);
    		});
    };
	$scope.Delete = function(event,$params) {
		var confirm = $mdDialog.confirm()
						.title("Delete Confirm ?")
						.textContent("ยืนยันการลบข้อมูล")
						.ariaLabel("Delete na")
						.targetEvent(event)
						.ok("Yes")
						.cancel("No");
		$mdDialog.show(confirm).then(function(){
			//Yes
			$http.post("/site/delete", {"uid":$params})
				.success(function(data) {
					$scope.header = data.header;
					$scope.results = data.results;
					$mdToast.show(
						$mdToast.simple()
							.textContent("Delete Success!!!")
							.position("top right")
							.hideDelay(3000)
					);
				})
				.error(function(err) {
					$log.error(err);
					$scope.message = err;
					$mdToast.show(
						$mdToast.simple()
							.textContent("Delete Fail!!! : " + err)
							.position("top right")
							.hideDelay(3000)
					);
				});
		},function(){
			//No
		});
	};

}]);