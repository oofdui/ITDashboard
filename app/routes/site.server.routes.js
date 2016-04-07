module.exports = function(app){
	var site = require("../controllers/site.server.controllers");
	app.get("/site",site.render);
	app.get("/site/select",site.select);
	app.post("/site/insert",site.insert);
	app.post("/site/delete",site.delete);
	app.post("/site/update",site.update);
	app.post("/site/updateStatusFlag",site.updateStatusFlag);
	//app.get("/site/:uid",site.edit);
}