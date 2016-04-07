var pg = require("pg");
var appRoot = process.cwd();
var config = require(appRoot + "/config/config");
//var config = require("../../config/config");
var connectionString = config.pgUri;
var util = require("util");

/* ### Example ###
var clsSQL = require("../myclass/clsSQL");
clsSQL.select("SELECT * FROM site;",function(errors,results){
	if(errors){
		console.log("## ERROR : "+errors);
	}
	else{
		console.log("## RESULT : "+results);
	}
});
*/
exports.select = function(sql,callback){
	var results = [];
	pg.connect(connectionString , function(errors,client,done){
		//Handle Connection Error
		if(errors){
			done();
			callback(errors,null);
			console.log("############## SELECT Connection Fail " + Date.now() + " : " + errors.error);
			console.log(util.inspect(errors,false,null));
		}
		//SQL Query : SELECT
		var query = client.query(sql);
		//Handle SQL Query Error
		query.on("error",function(errorsQuery){
			console.log("############## SELECT Fail " + Date.now() + " : " + errorsQuery.error);
			console.log(util.inspect(errorsQuery,false,null));
			callback(errorsQuery,null);
		});
		//Stream result back row at a time
		query.on("row",function(row){
			results.push(row);
		});
		//After all data is returned, close connection and return results
		query.on("end",function(){
			console.log("############## SELECT Success " + Date.now() + " : " + results.length + " rows");
			//console.log(util.inspect(results,false,null));
			done();
			callback(null,results);
		});
	});
}
/* ### Example ###
var clsSQL = require("../myclass/clsSQL");
var objects = [
	{name:"name",value:"Test from class.",parameter:"$1"},
	{name:"detail",value:"Test from class detail.",parameter:"$2"}
];
clsSQL.insert("site",objects,function(errors,results,uid){
	if(errors){
		console.log("## ERROR : "+errors);
	}
	else{
		console.log("## RESULT : "+results+" , return uid="+uid);
	}
});
*/
exports.insert = function(table,objects,callback){
	var sql = "INSERT INTO <$table>(<$name>)VALUES(<$value>) RETURNING uid;";
	var name = "";var value = "";var parameters = [];

	for(var i=0;i<objects.length;i++){
		if(i>0){
			name += ",";value += ",";
		}
		name += objects[i].name;
		value += objects[i].parameter;
		parameters.push(objects[i].value);
	}

	sql = sql.replace("<$table>",table).replace("<$name>",name).replace("<$value>",value);

	pg.connect(connectionString,function(errors,client,done){
		if(errors){
			done();
			callback(errors,null,null);
			return;
		}
		client.query(
			sql,
			parameters,
			function(errors,results){
				if(errors){
					console.log("############## INSERT Fail " + Date.now() + " : " + errors.error);
					console.log(util.inspect(errors,false,null));
					callback(errors,null,null);
				}
				else{
					console.log("############## INSERT Success " + Date.now() + " : " + results + " , uid=" + results.rows[0].uid);
					console.log(util.inspect(results,false,null));
					callback(null,results,results.rows[0].uid);
				}
				console.log(sql);
				console.log(JSON.stringify(parameters,null,4));
			}
		);
	});
}
/* ### Example ###
var clsSQL = require("../myclass/clsSQL");
var objects = [
	{name:"name",value:"TestUpdate",parameter:"$1"},
	{name:"detail",value:"TestUpdate",parameter:"$2"}
];
var objectsWhere = [
	{name:"uid",value:143,parameter:"$3"},
];
clsSQL.update("site",objects,objectsWhere,function(errors,results){
	if(errors){
		console.log("## ERROR : "+errors);
	}
	else{
		console.log("## RESULT : "+results);
	}
});
*/
exports.update = function(table,objects,objectsWhere,callback){
	var sql = "UPDATE <$table> SET <$value> WHERE <$where>;";
	var value = "";var parameters = [];
	var where = "";

	for(var i=0;i<objects.length;i++){
		if(i>0){
			value += ",";
		}
		value += objects[i].name + "=" + objects[i].parameter;
		parameters.push(objects[i].value);
	}
	for(var i=0;i<objectsWhere.length;i++){
		if(i>0){
			where += "AND ";
		}
		where += objectsWhere[i].name + "=" + objectsWhere[i].parameter;
		parameters.push(objectsWhere[i].value);
	}
	sql = sql.replace("<$table>",table).replace("<$value>",value).replace("<$where>",where);

	pg.connect(connectionString,function(errors,client,done){
		if(errors){
			done();
			callback(errors,null);
		}
		else{
			client.query(
				sql,
				parameters,
				function(errors,results){
					if(errors){
						console.log("############## UPDATE Fail " + Date.now() + " : " + errors.error);
						console.log("SQL : " + sql);
						console.log("Parameters : " + parameters)
						console.log(util.inspect(errors,false,null));
						callback(errors,null);
					}
					else{
						console.log("############## UPDATE Success " + Date.now() + " : " + results);
						console.log(util.inspect(results,false,null));
						callback(null,results);
					}
				}
			);
		}
	});
}
/* ### Example ###
var clsSQL = require("../myclass/clsSQL");
var objects = [
	{name:"uid",value:5,parameter:"$1"}
];
clsSQL.delete("site",objects,function(errors,results){
	if(errors){
		console.log("## ERROR : "+errors);
	}
	else{
		console.log("## RESULT : "+results);
	}
});
*/
exports.delete = function(table,objects,callback){
	var sql = "DELETE FROM <$table> WHERE <$where>;";
	var where = "";
	var parameters = [];

	for(var i=0;i<objects.length;i++){
		if(i>0){
			where += "AND "
		}
		where += objects[i].name+"="+objects[i].parameter;
		parameters.push(objects[i].value);
	}

	sql = sql.replace("<$table>",table).replace("<$where>",where);

	pg.connect(connectionString, function(errors,client,done){
		if(errors){
			done();
			callback(errors,null);
		}
		else{
			client.query(
				sql,
				parameters,
				function(errors,results){
					if(errors){
						console.log("############## DELETE Fail " + Date.now() + " : " + errors.error);
						console.log(util.inspect(errors,false,null));
						callback(errors,null);
					}
					else{
						console.log("############## DELETE Success " + Date.now() + " : " + results);
						console.log(util.inspect(results,false,null));
						callback(null,results);
					}
				}
			);
		}
	});
}