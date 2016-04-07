exports.show = function(type,message){
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
		hideDelay: 6000,
		position: "top right"
	});
}