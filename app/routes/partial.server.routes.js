module.exports = function(app){
	var partial = require("../controllers/partial.server.controllers");
	app.get("/modules/:module/views/:partial",partial.render);
}