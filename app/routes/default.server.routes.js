module.exports = function(app){
	var _default = require("../controllers/default.server.controllers");
	app.get("/",_default.render);
}