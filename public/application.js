"use strict";

var mainAppModuleName = "Main";
var mainAppModule = angular.module(mainAppModuleName,["ui.router","core","default","site"]);

angular.element(document).ready(function(){
	angular.bootstrap(document.querySelector("#mainApp"),[mainAppModuleName],{
		strictDi:true
	});
});