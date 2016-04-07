var express = require("express");
var morgan = require("morgan");
var compression = require("compression");
var bodyParser = require("body-parser");

var sass = require("node-sass-middleware");//Set SASS
var validator = require("express-validator");//Set Validator
var cookieSession = require("cookie-session");//Set Cookie & Session
var session = require("express-session");
var config = require("./config");

module.exports = function(){
	var app = express();

	//Set Default View Folder & Template Engine
	app.set("views",["./app/views","./public"]);
	app.set("view engine","jade");

	//Check Environment Variable (Setting by command : 'export NODE_ENV=development' OR 'export NODE_ENV-production')
	if(process.env.NODE_ENV == "development"){
		app.use(morgan("dev"));
		console.log("Development Mode");
	}
	else{
		app.use(compression);
		console.log("Production Mode");
	}

	app.use(cookieSession({name:"session",keys:["secret_key1","secret_key2","secret_key3"]}));
	app.use(session({secret:config.sessionSecret,resave:false,saveUninitialized:true}));
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(validator());//Set Validator, Muse use after app.use(bodyParser) soon
	app.use(sass({src:"./sass",dest:"./public/css",outputStyle:"compressed",prefix:"/css",debug:true}));//Set Default Value of SASS (src=SourceFile , dest=CompileToFolder , outputStyle=compressed compact expanded , prefix=Default Path of CSS File) * Must use before set static folder
	app.use(express.static("./public"));//Set Default Static Folder

	require("../app/routes/default.server.routes")(app);
	require("../app/routes/partial.server.routes")(app);
	require("../app/routes/index.server.routes")(app);
	require("../app/routes/user.server.routes")(app);
	require("../app/routes/site.server.routes")(app);

	return app;
}