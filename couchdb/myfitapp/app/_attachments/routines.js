/*
	Rueben Anderson
	06/09/2012
	ASD 1206
*/


$("#routinehome").live("pageshow", function(){
	
	
	function makeLists(filter) {
		var path = "";
		
		switch(filter) {
		case "aerobics":
			path = "fitapp/aerobics";
			break;
			
		case "anaerobics":
			path = "fitapp/anaerobics";
			break;
			
		case "calisthenics":
			path = "fitapp/calisthenics";
			break;
			
		case "flexibility":
			path = "fitapp/flexibility";
			break;
			
		case "maternity":
			path = "fitapp/maternity";
			break;
		
		case "showall":
			default:
				path = "fitapp/all";
				break;
		};
		
		getDB("myfitapp", path, parseJSON);
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