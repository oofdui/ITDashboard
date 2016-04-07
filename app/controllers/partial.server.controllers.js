exports.render = function(request,response){
	//response.render("./modules/users/views/login.client.view.jade");
	response.render("." + request.path + ".jade");
}