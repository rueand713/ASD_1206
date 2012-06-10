/*
	Rueben Anderson
	06/09/2012
	ASD 1206
*/


$(document).ready(function(){
	
	function newXHR(path, type, request, connect, success, failure){
		// path is the string target location path
		// alternatively path may be an object passed in with
		// key pairs of all arguments expected; this is mandatory
		// if you want to specify more options than the minimum
		// path can also be an array of 2 indexes; the first index is the string path
		// while the second index is the data variable of information to send
		// type is the data type of information to expect (json, html, xml, text, script, jsonp)
		// request is the type of http request to make GET or POST
		// success and failure are the functions that correspond to each
		// sets default options incase arguments are missing
		// connect is the type of connection: synchronous (false) or asynchronous (true)
		
		if (!type || typeof(type) != "string") {
			type = "html";	
		};
		
		if (!request || typeof(request) != "string") {
			request = "GET";
		};
		
		if (!success || typeof(success) != "function") {
			success = function(result) {
				console.log("Request was a success!");
				console.log(result);
			};
		} else {
			// sets win to the success function
			var win = success;
			
			// creates a new anonymous function as the main success function
			// that calls the passed in success function (win) with the result argument
			success = function(result) {
				win(result);
			};	
		};
		
		if (!failure || typeof(failure) != "function") {
			failure = function(error) {
				console.log("Request failed or timedout!");
				console.log(error);
			};
		} else {
			// sets lose to the failure function
			var lose = failure;
			
			// creates a new anonymous function as the main failure function
			// that calls the passed in failure function (lose) with the error argument
			failure = function(error) {
				lose(error);
				toWait = false;
			};	
		};
		
		
		function httpRequest(send){
			// construct the ajax object
			var ajaxObj = {
				url:	path,
				type:	request,
				dataType:  type,
				success: success,
				error:	failure
			};
			
			// if send is true (or anything) assume data is being sent
			if (send) {
				ajaxObj.url = path[0];
				ajaxObj.data = path[1];
			};
			
			if (connect === false) {
				ajaxObj.async =	false;
			};
			
			// send the ajax request
			$.ajax(ajaxObj);	
		};
		
		
		if (path) {
			// checks if data is being used for the complete ajax object or not
			// if data is a string and not an object create an xhr object based on the passed in arguments
			// otherwise create the object using the key/value pairs in data
			switch(typeof(path)) {
				
				case "object":
					if (path.length) {
						// path is a javascript array
						// passes in true to tell the function to expect to send data
						httpRequest(true);
					} else {
						// path is a javascript object
						$.ajax(path);
					};
					break;
				
				case "string":
				default:
					// no argument, nothing to send
					httpRequest();
					break;
			};
		};
	};
	
	
	function makeLists(filter) {
		var path = "";
		
		switch(filter) {
		case "aerobics":
			path = "_view/aerobics";
			break;
			
		case "anaerobics":
			path = "_view/anaerobics";
			break;
			
		case "calisthenics":
			path = "_view/calisthenics";
			break;
			
		case "flexibility":
			path = "_view/flexibility";
			break;
			
		case "maternity":
			path = "_view/maternity";
			break;
		
		case "showall":
			default:
				path = "_view/all";
				break;
		};
		
		newXHR(path, "json", "GET", false, parseJSON);
	};
	
	
	function parseJSON(result) {
		
		// clears the data from the routines div
		$("#routines").empty();
		
		$.each(result.rows, function(index, jsonObj) {
			
			// create collapsible div
			$("<div id='topDiv" + index + "' data-role='collapsible' data-collapsed='true'></div>").appendTo("#routines");
			
			// create header for title information
			$("<h3 id='head" + index + "'>" + jsonObj.value.name[1] + "</h3>").appendTo("#topDiv" + index);
			
			// create ul for list of data
			$("<ul id='topUl" + index + "' data-role='listView'></ul>").appendTo("#topDiv" + index);
			
			// for each key value in the n object create an li with the data
			for (var n in jsonObj.value) {
				
				$("<li>" + jsonObj.value[n][0] + " " + jsonObj.value[n][1] + "</li>").appendTo("#topUl" + index);
			}
		});
		
		$("#routines").trigger("create");
		var lists = $("[data-role='listview']");
		for (var i=0; i < lists.length; i++) {
			$(lists[i]).listview("refresh");
		};
	};
	
	
	
	// function binding
	// passes in the id of the clicked link to 
	// send ajax request based on that filter
	$("#showall").bind("click", function(){
		makeLists(this.id);
	});
	$("#aerobics").bind("click", function(){
		makeLists(this.id);
	});
	$("#anaerobics").bind("click", function(){
		makeLists(this.id);
	});
	$("#calisthenics").bind("click", function(){
		makeLists(this.id);
	});
	$("#flexibility").bind("click", function(){
		makeLists(this.id);
	});
	$("#maternity").bind("click", function(){
		makeLists(this.id);
	});
	$("#logoLink").bind("click", function(){
		makeLists("showall");
	});
	
});