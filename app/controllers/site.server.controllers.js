var pg = require("pg");
var async = require("async");
var appRoot = process.cwd();
var config = require(appRoot + "/config/config");
//var config = require("../../config/config");
var connectionString = config.pgUri;
var sqlSELECT = "SELECT uid,name,detail,statusflag,cwhen,mwhen FROM site ORDER BY cwhen DESC;";

exports.render = function(request,response){
	var clsSQL = require("../myclass/clsSQL");
	clsSQL.select(sqlSELECT,function(errors,results){
		if(errors){
			console.log("Results : " + errors);
			response.render("site",{
				success:false,
				title:"Site Manage",
				header:"ระบบจัดการข้อมูลโรงพยาบาล",
				message:errors,
				results:null
			});
		}
		else{
			response.render("site",{
				success:true,
				title:"Site Manage",
				header:"ระบบจัดการข้อมูลโรงพยาบาล",
				message:"",
				results:results
			});
		}
	});
}
exports.select = function(request,response){
	var message = "";
	var clsSQL = require("../myclass/clsSQL");
	
	clsSQL.select(sqlSELECT,function(errors,results){
		if(errors){
			response.send({
				success:false,
				title:"Site Manage",
				header:"ระบบจัดการข้อมูลโรงพยาบาล",
				message:errors,
				results:null
			});
		}
		else{
			response.send({
				success:true,
				title:"Site Manage",
				header:"ระบบจัดการข้อมูลโรงพยาบาล",
				message:"",
				results:results
			});
		}
	});
}
exports.insert = function(request,response){
	var clsSQL = require("../myclass/clsSQL");
	var objects = [
		{name:"statusflag",value:request.body.statusflag,parameter:"$1"},
		{name:"name",value:request.body.code,parameter:"$2"},
		{name:"detail",value:request.body.name,parameter:"$3"}
	];
	clsSQL.insert("site",objects,function(errors,results,uid){
		if(errors){
			response.send({
				success:false,
				title:"Site Manage",
				header:"ระบบจัดการข้อมูลโรงพยาบาล",
				message:"INSERT Fail : " + errors,
				results:null
			});
		}
		else{
			clsSQL.select(sqlSELECT,function(errors,results){
				if(errors){
					response.send({
						success:false,
						title:"Site Manage",
						header:"ระบบจัดการข้อมูลโรงพยาบาล",
						message:errors.error,
						results:null
					});
				}
				else{
					response.send({
						success:true,
						title:"Site Manage",
						header:"ระบบจัดการข้อมูลโรงพยาบาล",
						message:"",
						results:results
					});
				}
			});
		}
	});
}
exports.delete = function(request,response){
	var clsSQL = require("../myclass/clsSQL");
	var objects = [
		{name:"uid",value:request.body.uid,parameter:"$1"}
	];
	clsSQL.delete("site",objects,function(errors,results){
		if(errors){
			response.send({
				success:false,
				title:"Site Manage",
				header:"ระบบจัดการข้อมูลโรงพยาบาล",
				message:errors,
				results:null
			});
		}
		else{
			clsSQL.select(sqlSELECT,function(errors,results){
				if(errors){
					response.send({
						success:false,
						title:"Site Manage",
						header:"ระบบจัดการข้อมูลโรงพยาบาล",
						message:errors.error,
						results:null
					});
				}
				else{
					response.send({
						success:true,
						title:"Site Manage",
						header:"ระบบจัดการข้อมูลโรงพยาบาล",
						message:"",
						results:results
					});
				}
			});
		}
	});
}
exports.update = function(request,response){
	var clsSQL = require("../myclass/clsSQL");
	var objects = [
		{name:"statusflag",value:request.body.statusflag,parameter:"$1"},
		{name:"name",value:request.body.code,parameter:"$2"},
		{name:"detail",value:request.body.name,parameter:"$3"},
		{name:"mwhen",value:"NOW()",parameter:"$4"}
	];
	var objectsWhere = [
		{name:"uid",value:request.body.uid,parameter:"$5"},
	];
	clsSQL.update("site",objects,objectsWhere,function(errors,results){
		if(errors){
			response.send({
				success:false,
				title:"Site Manage",
				header:"ระบบจัดการข้อมูลโรงพยาบาล",
				message:errors,
				results:null
			});
		}
		else{
			clsSQL.select(sqlSELECT,function(errors,results){
				if(errors){
					response.send({
						success:false,
						title:"Site Manage",
						header:"ระบบจัดการข้อมูลโรงพยาบาล",
						message:errors.error,
						results:null
					});
				}
				else{
					response.send({
						success:true,
						title:"Site Manage",
						header:"ระบบจัดการข้อมูลโรงพยาบาล",
						message:"",
						results:results
					});
				}
			});
		}
	});
}
exports.updateStatusFlag = function(request,response){
	var clsSQL = require("../myclass/clsSQL");
	var objects = [
		{name:"statusflag",value:request.body.statusflag,parameter:"$1"},
		{name:"mwhen",value:"NOW()",parameter:"$2"}
	];
	var objectsWhere = [
		{name:"uid",value:request.body.uid,parameter:"$3"},
	];
	clsSQL.update("site",objects,objectsWhere,function(errors,results){
		if(errors){
			response.send({
				success:false,
				title:"Site Manage",
				header:"ระบบจัดการข้อมูลโรงพยาบาล",
				message:errors,
				results:null
			});
		}
		else{
			clsSQL.select(sqlSELECT,function(errors,results){
				if(errors){
					response.send({
						success:false,
						title:"Site Manage",
						header:"ระบบจัดการข้อมูลโรงพยาบาล",
						message:errors.error,
						results:null
					});
				}
				else{
					response.send({
						success:true,
						title:"Site Manage",
						header:"ระบบจัดการข้อมูลโรงพยาบาล",
						message:"",
						results:results
					});
				}
			});
		}
	});
}