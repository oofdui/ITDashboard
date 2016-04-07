exports.render = function(request,response){
	var isLoggedIn = false;

	if(typeof request.session.remember != "undefined"){
		isLoggedIn = request.session.remember;
	}

	response.render("index",{
		title:"Hello World",
		message:"Hi Fucking Hero.",
		isLoggedIn:isLoggedIn
	});
}