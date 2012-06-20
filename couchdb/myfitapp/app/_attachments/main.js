/*	Rueben Anderson
	05/28/2012
	ASD 1206
*/

// Wait until the document is ready
$(document).ready(function() {


function getCheckBoxValue() {
		// Checks for checkboxes with a checked state
		// Stores empty string for unchecked states & an x for checked states
		var radios = $("input[type='radio']"),
		    boxes  = $("input[type='checkbox']");
		
		for (var i=0; i < boxes.length; i++) {
			if ($(boxes[i]).prop("checked")) {
				day[i] = "x";
			}
			else {
				day[i] = ""
			}
		};
		
		// Stores the value of the checked radio button as the exercise type
		for (var i = 0; i < radios.length; i++) {
			if ($(radios[i]).prop("checked")) {
				exerciseType = $(radios[i]).attr("value");
			};
		};
	};

	function setCheckBoxValue(item) {
		
		// Checks for checkboxes with a checked state
		// Adds a checked value to the checked attribute for true
		var dayVals = [[item.sun[1], "sunday"], [item.mon[1], "monday"], [item.tue[1], "tuesday"], [item.wed[1], "wednesday"], 
		               [item.thu[1], "thursday"], [item.fri[1], "friday"], [item.sat[1], "saturday"]
						];
			
		for (var i=0; i<dayVals.length; i++) {
			if (dayVals[i][0] == "x") {
				$("input[type='checkbox'][value='" + dayVals[i][1] + "']").prop("checked", true).checkboxradio("refresh");
			};
		};
			
		// checks the proper radio button based on the routine type and refreshes the form state
		$("input[type='radio'][value='" + item.routinetype[1] + "']").prop("checked", true).checkboxradio("refresh");
		
		// refresh the checkbox and radio buttons
		refreshButtons();

	};

	function storeData(key) {
		var saved = true;
		
	// Stores all form field values in an object.
	// Object properties contain arrays with the form label and input value.
		getCheckBoxValue();
		var exClass = getExerciseClass();
		var item = {
			"type": ["Class:", exClass],
			"name": ["Routine:", $("#routineName").val()],
			"location": ["Location:", $("#routineLoc").val()],
			"routinetype": ["Workout:", exerciseType],
			"sun": ["Sun:", day[0]],
			"mon": ["Mon:", day[1]],
			"tue": ["Tue:", day[2]],
			"wed": ["Wed:", day[3]],
			"thu": ["Thu:", day[4]],
			"fri": ["Fri:", day[5]],
			"sat": ["Sat:", day[6]],
			"repdur": ["Reps/Duration:", $("#workout").val()],
			"notes": ["Comments:", $("#comments").val()],
			"date": ["Start:", $("#startDate").val()]
		};
		
		// Checks if there is no key, which means this is a new routine and needs a new key.
		if (!key) {
			//var id = Math.pow(Math.floor(Math.random()*100000001), Math.floor(Math.random()*10)),
				isNew = true;
		} 
			else {
				// Set the id to the existing key that is being edited so that the data will be overwritten.
				// This key is the same key being passed from the editSubmit event handler.
				isNew = false;
				item._id = key[0];
				item._rev = key[1];
			};
			
		$.couch.db("myfitapp").saveDoc(item, {
			success: function(data){
				//console.log(data);
			},
			error: function(status){
				saved = false;
				//console.log(status);
			}
		});
		
		$("#startDate").textinput("disable");
		if (isNew === true && saved === true) {
			alert("Routine Added!");
		}
			else if (isNew != true && saved === true) {
				alert("Routine Updated!");
			}
				else if (saved === false) {
					alert("Database error!");
				};
		
		isOld = false;
		restoreDefault();
		$.mobile.changePage($("#home"),"slide");
	};
	
	// gets the exercise class based on the radio box checked's class attribute
    function getExerciseClass(){
    	var exClass = "";
    	
    	switch(exerciseType) {
    	
    	case "Running":
    	case "Kickboxing":
    	case "Swimming":
    	case "Bicycling":
    	case "Rowing":
    	case "Jump Rope":
    		exClass = "Aerobics";
    		break;
    		
    	case "Squats":
    	case "Leg Extensions":
    	case "Dumbbell Curls":
    	case "Bench Press":
    	case "Tricep Extensions":
    	case "Bent Over Rows":
    		exClass = "Anaerobics";
    		break;
    		
    	case "Jumping Jacks":
    	case "Lunges":
    	case "Dips":
    	case "Crunches":
    	case "Pull Ups":
    	case "Push Ups":
    		exClass = "Calisthenics";
    		break;
    		
    	case "Hip Flexor Stretch":
    	case "Piriformis Stretch":
    	case "Hamstring Stretch":
    	case "Quad Stretch":
    	case "Back Stretch":
    	case "Shoulder Stretch":
    		exClass = "Flexibility";
    		break;
    		
    	case "Walking":
    	case "Side Lunges":
    	case "Step Ups":
    	case "Lite Swimming":
    	case "Lying Abduction":
    	case "Wall Squats":
    		exClass = "Maternity";
    		break;
    		
    		default:
    			break;
    	};
   
    	return exClass;
    };
	
	// restores the "good" defaults when invoked for new routines
	// but clears all fields when the "reset" button is clicked
	function restoreDefault(option) {
		
		// restores all default form values
		var myDate = new Date(),
		    dayCheck = myDate.getDate(),
		    moCheck = myDate.getMonth(),
		    yrCheck = myDate.getFullYear();
		
		if ((dayCheck * 1) < 10) {
			dayCheck = "0" + dayCheck;
		};
		
		if ((moCheck * 1) + 1 < 10) {
			moCheck = "0" + ((moCheck * 1) + 1);
		} 
			else {
				moCheck = ((moCheck * 1) + 1);
			};
			
		$("#startDate").val("" + yrCheck + "/" + moCheck + "/" + dayCheck);
		
			
		// Set defaults for the form
		$("#routineName").val("");
		$("#workout").val(30);
		$("#comments").val("");
		$("#routineLoc").val("");
		$("#submit").removeAttr("key");
		
		// Reset the jQuery data fields for the list		
		var collapsedLists = $("div[data-role='collapsible']");
		
		for (var j=0; j < collapsedLists; j++) {
			$(collapsedLists[j]).attr("data-collapsed", true);
		};
		
		var radios = $("input[type='radio']"),
		    boxes  = $("input[type='checkbox']");
		
		// resets the radio buttons
		for (var j=0; j<radios.length; j++) {
			$(radios[j]).prop("checked", false);
		};
		
		// resets the checkboxes
		for (var j=0; j<boxes.length; j++) {
			$(boxes[j]).prop("checked", false);
		};
	
		// when no argument is passed in, do these default actions
		if (!option) {
			search = false;
			searchVal = "";
			storCnt = 0;
			toggleControls("off");
			
			// set the "good" defaults for frequency
			$("#monday").prop("checked", true).checkboxradio("refresh");
			$("#wednesday").prop("checked", true).checkboxradio("refresh");
			$("#friday").prop("checked", true).checkboxradio("refresh");
			
		};
		
		
		// refresh the checkbox and radio buttons unless
		// false is passed in
		if (option != false) {
			refreshButtons();
		};
	};

	// refreshes all of the jQuery styling that may have taken place
	// dynamically via javascript methods
	function refreshButtons() {

		var radios = $("input[type='radio']"),
		    boxes  = $("input[type='checkbox']"),
		    select = $("#routineLoc"),
		    slider = $("#workout");
	
		// refreshes the radio buttons
		for (var j=0; j<radios.length; j++) {
			$(radios[j]).checkboxradio("refresh");
		};
		
		// refreshes the checkboxes
		for (var i=0; i<boxes.length; i++) {
			$(boxes[i]).checkboxradio("refresh");
		};
		
		// refreshes the select menu
		$(select).selectmenu("refresh");
		
		// refreshes the slider
		$(slider).slider("refresh");

	};
	
	
	// toggles the list and form views in the routines page
	function toggleControls(m) {
		switch(m) {
			case "on":
				$("#routineForm").hide();
				$("#clearLists").show();
				//$("#showData").attr("disabled", "true");
				//$("#addNew").removeAttr("disabled");
				$("#listForm").show();
				break;
			case "off":
				$("#routineForm").show();
				$("#clearLists").show();
				//$("#showData").removeAttr("disabled");
				//$("#addNew").attr("disabled", "true");
				$("#listForm").hide();
				break;
			default:
				return false;
		};
	return false;
	};
         
	 // parse a date string
	function parseTheDate(startVal) {
			var	year = startVal.substring(0, 4),
				month = startVal.substring(5, 7),
				day = startVal.substring(8, 10),
				inDate = new Date();
				
				inDate.setFullYear(year);
				inDate.setDate(day);
				inDate.setMonth(month-1);
				
			return Date.parse(inDate);
	};  
	
	// parse the json for the search feature
	function readyJSON(json) {
		var name = [json.name[1].toLowerCase()],
			workout = [json.routinetype[1].toLowerCase()],
			serch = [searchVal.toLowerCase()],
			name2 = "",
			work2 = "",
			tempSerch = "",
			tempName = "",
			tempWork = "";
		
		// Eliminate special characters from name string
		for (var j=0; j < name[0].length; j++) {
			if (name[0].charAt(j).search(/\W/) ==-1 || name[0].charAt(j).search(/\s/) !=-1) {
				tempName += name[0].charAt(j);
			};
		};
		
		name[0] = tempName;	
		
		for (var j=0, j2=-1; j < name.length; j++) {	
			
			if (name[0].search(/\s/) !=-1) {
				// Store each word in the string
				name = name[0].split(" ");
			};
		};
		
		name.push(tempName);
	
		// Eliminate special characters from workout string
		for (var h=0; h < workout[0].length; h++) {
			if (workout[0].charAt(h).search(/\W/) ==-1 || workout[0].charAt(h).search(/\s/) !=-1) {
				tempWork += workout[0].charAt(h);
			};
		};
			workout[0] = tempWork;
				
		for (var h=0, h2=-1; h < workout.length; h++) {	
			if (workout[0].search(/\s/) !=-1) {
				workout = workout[0].split(" ");
			};
		};	
		
		workout.push(tempWork);
				
		// Eliminate special characters from search string
		for (var i=0, i2=-1; i < serch[0].length; i++) {
			if (serch[0].charAt(i).search(/\W/) ==-1 || serch[0].charAt(i).search(/\s/) !=-1) {
				tempSerch += serch[0].charAt(i);
			};
		};

		serch[0] = tempSerch;
		
		// Compare the broken values of each variable to the search string
		for (var x=0; x < name.length; x++) {
			if (serch[0].search(name[x]) !=-1) {
				return true;
			};
		};
		
		for (var y=0; y < workout.length; y++) {
			if (serch[0].search(workout[y]) !=-1) {
				return true;
			};
		};
			
			return false;
	};


         // fetches the data for displaying in the routines page
	function getData() {
		$("#routines").empty();
		
		if (fromEdit === true) {
			fromEdit = false;
			restoreDefault();
		};
		
		storCnt = 0;
		toggleControls("on");
		$("#startDate").textinput("enable");
		
	
		// check to see if there is custom data in local storage
		// and removes unwanted sytstem data
		killInvalidLS();
		if (localStorage.length >0) {
			
			// Populates list with the object
			killInvalidLS();
			for (var k=0; k<localStorage.length; k++) {
					
					var key = localStorage.key(k),
						value = localStorage.getItem(key),
						newObj = JSON.parse(value),
						objDate = parseTheDate(newObj.date[1]),
						searchAt = readyJSON(newObj),
						dbKey = [newObj._id, newObj._rev];
					
					// checks to see if the data being fetched is for a search or not
					// if it is for a search, only when a match is found will the data be displayed
					if (search === true && searchAt === true || search === false) {		
							
							// makeLi appended to makeList, given an id
							$("<div id='title" + storCnt + "' data-theme='b' data-role='collapsible' data-collapsed='true'></div>").appendTo("#routines");
							
							// set the routine title for the accordion display
							$("<h4 id='heading" + storCnt + "'>  " + newObj.name[1] + "</h4>").appendTo("#title" + storCnt);
							
							// makeSubList appended to makeLi, given id
							$("<ul id='subUl" + storCnt + "' data-role='listview'></ul>").appendTo("#title" + storCnt);
						
							getImage(newObj.routinetype[1], storCnt);
							
							z = 0;
							// Populates the list object's items
							for (var n in newObj) {
								if (n.indexOf("_") == -1) {
									var optSubText = newObj[n][0] + " " + newObj[n][1];
									
									// makeSubLi given an id and appended to makeSubList
									$("<li id='item" + z + "-" + storCnt + "' data-theme='c'></li>").appendTo("#subUl" + storCnt);
									
									// makeSubLi given innerHTML
									$("#item" + z + "-" + storCnt).html(optSubText);
									z++;
								};
							};
							
							// linksLi created and appended to makeSubList
							$("<li id='links" + k + "' key='" + key + "' data-theme='c'></li>").appendTo("#subUl" + storCnt);
							storCnt++;
					};	// search functionality conditional
					// Creates the edit and delete links for each routine in local storage.
					makeRoutineLinks(localStorage.key(k), k, dbKey); 
			}; // localstoreage for loop (k) closing brace
			search = false;
			searchVal = "";
			
			// refresh the accordion
			$("#routines").trigger("create");
			
			var buttons = $("[type='button']");
			for (var i=0; i<buttons.length; i++) {
				$(buttons[i]).button("refresh");	
			};
		};
	};


	// Get the appropriate image for the exercise category
	function getImage(imgName, index) {
		
		// uncapitalize first letter of each string in the array
		var noSpace = imgName,
		    firstLetter = noSpace.charAt(0);
		    noSpace = firstLetter.toLowerCase() + noSpace.substring(1,noSpace.length);
		
		// Get image file names by returning the substring from index 0 to the first space
		imgName = noSpace;
		
		var endMark = imgName.indexOf(" ");
		
		if (endMark === -1) {
			imgName = imgName.substring(0,imgName.length);
		}
		else {
			imgName = imgName.substring(0, endMark);
		};
	
		// creates the img elements
		$("<img src='" + imgName + ".png' class='dataImage' alt='routine icon'/>").prependTo("#heading" + index);
		
	};


	/* Make Routine Links
	   Create the edit and delete links for reach stored item when displayed. */
	function makeRoutineLinks(key, index, dbKey) {
		// Define edit delete link variables
		var keyId = [$("#links" + index).attr("key"), dbKey],
			param = $($.mobile.activePage).data("url");
		
		$("<div id='linkcontainer" + index + "' data-role='controlgroup'></div>").appendTo("#links" + index);
		$("<a href='#myRoutine' id='edit" + index + "' data-role='button' data-icon='refresh' data-theme='a'>Edit Routine</a>").appendTo("#linkcontainer" + index);
		$("<a href='" + param + "' id='del" + index + "' data-role='button' data-icon='delete' data-theme='a'>Delete Routine</a>").appendTo("#linkcontainer" + index);
		$("#edit" + index).die("click").live("click", function(){
			editRoutine(keyId);
			});
		$("#del" + index).die("click").live("click", function() {
			deleteRoutine(keyId);
			});
	};

        // deletes the routine that corresponds with the passed in key but only
	// if the user confirms to remove that item
	function deleteRoutine(key) {
		var ask = confirm("Are you sure you want to delete this routine?");
		
		if (ask) {
			$.couch.db("myfitapp").removeDoc({_id:key[1][0], _rev:key[1][1]}, {
				success: function(data){
					//console.log(data);
				},
				error: function(status){
					//console.log(status);
				}
			});
			alert("The routine has been successfully removed!");
			// Refetch the list to reflect the delete action
			listMaker($($.mobile.activePage).data("url"));
			
		}
			else {
				alert("The routine was not deleted.");
			};
	};

	// sets the form field with the items to edit and activates "edit" mode
	// edit mode prevents the dates from being altered
	function editRoutine(key) {
		
		// clears the form of any previous edits
		// doesn't restore "good" defaults or default js form variables
		// but does refresh the radio and checkbox buttons
		//restoreDefault(true);
		
		// The routine is being edited so a true value is assigned to the isOld variable to 
		// prevent the validator from forcing a new updated start date and to prevent backdating the field is disabled.
		isOld = true;
		
		// Grab the data from the Local Storage item
		var value = localStorage.getItem(key[0]),
			item = JSON.parse(value);
			
			// Shows the form
			toggleControls("off");
	
			// Populate the form fields with current lcoalStorage values.
			$("#routineName").val(item.name[1]);
			$("#routineLoc").val(item.location[1]);
			$("#workout").val(item.repdur[1]*1);
			$("#comments").val(item.notes[1]);
			$("#startDate").val(item.date[1]);
			
			// Function that populates the checkbox fields.
			setCheckBoxValue(item);
			
			// Update the key
			$("#submit").attr("key", key[1]);
			
			// Save the key value in this function as a property of the edit submit event
			// So the value may be reused when the edited data is saved.
			$("#submit").die("click").live("click", function() {
				validate();
				});
			
			$("#startDate").textinput("disable");
			fromEdit = true;
	};

	// validates that the date entered is proper format and that the date is indeed
	// a current or future date and not backdated.
	function validDate() {
		var err = false,
			key = $("#submit").attr("key");
		
		if (isOld === false) {
			var startVal = $("#startDate").val(),
			    year = startVal.substring(0, 4),
			    month = startVal.substring(5, 7),
			    day = startVal.substring(8, 10),
			    today = new Date(),
			    inDate = new Date();
			    inDate.setFullYear(year);
			    inDate.setDate(day);
			    inDate.setMonth(month-1);
									
			if (Date.parse(inDate) < Date.parse(today)) {
				$("#startDate").addClass("error");
				alert("Please enter the current date or a future date.");
				err = true;
			}
		};
		
		// if the routine is being edited or it's new and the date is current or future
		// the data can be saved
		if (isOld === true || err === false) {
			// If everything is ok save the data. Send the key value from the edit data function
			// This key value was passed through the editSubmit event listener as a property.
			if (key) {
				key = key.split(",");
			};
			
			storeData(key);
		};
	};
			
	// validates the form using the jQuery validation
	// if it passes it must then validate the date
	function validate(key) {
		myForm.validate({
			invalidHandler: function(form, validator) {},
			submitHandler: function(data) {
				validDate();
			}
		});
	};

	
	// checks the form radio box that corresponds with the exercise clicked 
	function setInlayVars() {
		// resets all data but doesn't refresh the radio
		// and checkbox buttons
		restoreDefault(false);
		
		var thisId = this.id,
			localId = ["Running", "Kickboxing", "Swimming", "Bicycling", "Rowing", "Jump Rope", "Squats",
			"Leg Extension", "Dumbbell Curls", "Bench Press", "Tricep Extension", "Bent Over Rows", "Jumping Jacks",
			"Lunges", "Dips", "Crunches", "Pull Ups", "Push Ups", "Hip Flexor Stretch", "Piriformis Stretch",
			"Hamstring Stretch", "Quad Stretch", "Back Stretch", "Shoulder Stretch", "Walking", "Side Lunges",
			"Step Ups", "Lite Swimming", "Lying Abduction", "Wall Squats"],
			container = [
			["aero",["Running", "Kickboxing", "Swimming", "Bicycling", "Rowing", "Jump"]],
			["anaero",["Squats", "Leg", "Dumbbell", "Bench", "Tricep", "Bent"]],
			["calisth",["Jumping", "Lunges", "Dips", "Crunches", "Pull", "Push"]],
			["flex",["Hip", "Piriformis", "Hamstring", "Quad", "Back", "Shoulder"]],
			["matern",["Walking", "Side", "Step", "Lite", "Lying", "Wall"]]
			];
		
		for (var x=0, w=0; x<container.length; x++) {
		
			for (var y=0; y<container[x][1].length; y++) {
				var newWord = localId[w];
		
				for (var k=0, noSpace=""; k < newWord.length; k++) {
					// Eliminates the white spaces (if any) in the string
					if (!(newWord.charAt(k)==" ")) {
						noSpace += newWord.charAt(k);
					};
				};
				
				// uncapitalize first letter of each string in the array
				var firstLetter = noSpace.charAt(0);
					noSpace = firstLetter.toLowerCase() + noSpace.substring(1,noSpace.length);
				
			
				var newConcat = container[x][0] + container[x][1][y],
					newPrefix = container[x][0];
				
				// If the id of the clicked link equals the id of the new concatenation then
				// check the radio button that corresponds to that given id
				if (thisId == newConcat) {
					$("#" + noSpace).prop("checked", true);
					$("#" + newPrefix).attr("data-collapsed", "false");
				};
				w++;
			};
		};
	};
	
	// sets the click events for home page inlay links
	function setInlayLinks() {
		var container = $("a[name='categories']");
		
		for (var i=0, id; i < container.length; i++) {
			id = "#" + $(container[i]).attr("id");
			$(id).die("click").live("click", setInlayVars);
		};
	};
	
	
	function refreshPage() {
		// Goes to the home page and forces a refresh
		$.mobile.changePage($("#home"),"slide");
		location.reload();
	};
	
	
	// send request object with jquery.couch.js
	function getDB(database, view, success){
		if (database && view) {
				var couchObj = new Object;
				
				couchObj.success = function(data){
					
					if (success && typeof(success) == "function"){
						success(data);
					} else {
						console.log("Success!");
						console.log(data);	
					};
				};
				
				// makes the couch ajax request with the jQuery.couch.js
				$.couch.db(database).view(view, couchObj);
		};
	};
	
	
	// clears the routines div and creates the new list of data based on the view
	function parseJSON(result) {
		// sets result to only the rows object
		var json = result.rows
		
		// removes any lingering data in storage
		localStorage.clear();
		
		for (var i=0; i<json.length; i++) {
				//json[i].value["id"] = result.rows[i].id;
				//json[i].value[""] = result.rows[i].rev;
				var id = Math.floor(Math.random()*100000001);
				localStorage.setItem(id, JSON.stringify(json[i].value));
		};
		
		// display the newly saved local data
		getData();
	};
	
	
	// this function removes any system data stored in localStorage
	// which interferes with the operation of this application
	function killInvalidLS() {
		// checks if localstorage has any data
		if (localStorage.length >0) {
			for (var n in localStorage) {
				var stor = localStorage.getItem(n);
				// checks if data found is json object
				// if it's not remove the system file
				if (stor.charAt(0) != '{') {
					console.log("Removing: " + n);
					localStorage.removeItem(n);
				};
			};
		};
	};
	
	
	// splits the url into 3 parts to gain access to the parameters
	// list at the end of the url string
	function urlExtractor(urldata){
		var urlparts = urldata.split("?"),
			urlpairs = urlparts[1].split("&"),
			urlvalues = {};
	
		for (var n in urlpairs) {
			var keyval = urlpairs[n].split("=");
			var key = decodeURIComponent(keyval[0]);
			var value = decodeURIComponent(keyval[1]);
		
			urlvalues[key] = value;
		}
		
		return urlvalues;
	};
	
	
	// Makes the accordion or routines on the routines.html page
	// based on the data from the url that is extracted in the urlExtractor
	function listMaker(thisData){
		// Reset the data in the div
		$("#routines").empty();
		
		// if there is not a argument extract the url from the page loaded
		// otherwise use the extracted data passed in
		var urlParam = urlExtractor(thisData)["cat"];
		
		// couchDb call to show a generated list based on urlParam
		getDB("myfitapp", "fitapp/" + urlParam, parseJSON);
	};
	

	
	// Variables
	var exerciseList = ["Aerobics", "Anaerobics", "Calisthenics", "Flexibility", "Maternity"],
	    day = [],
	    exerciseType = "",
	    errMsg = $("#errors"),
	    isOld = false,
	    orderType = "new",
	    search = false,
	    searchVal = "",
	    storCnt = 0,
	    fromEdit = false;
									
					
					
	// Set the Link & Submit click events					
	var save = $("#submit"),
	    showLink = $("#showData"),
	    addLink = $("#addNew"),
	    doSearch = $("#searchField"),
	    ctaLink = $("#ctaLink"),
	    resetInfo = $("#reset"),
	    myForm = $("#routineForm");
	
	// Refresh the radio and checkbox buttons when
	// the routine page is initialized
	$("#myRoutine").die("pageshow").live("pageshow", function(){
		refreshButtons();
		});
		
	// Function that binds events to List-Inlay home page
	setInlayLinks();
	
	save.die("click").live("click", function(){
		validate();
	});
	$(".homeLink").die("click").live("click", refreshPage);
	
	
	// custom function click events
	// these are anonymous functions that call the actual function.
	// This is needed to pass in values to the function calls
	// that isn't possible by just calling the function.
	addLink.die("click").live("click", function(){
		toggleControls("off");
		restoreDefault();
		});
	
	showLink.die("click").live("click", function(){
		toggleControls("on");
		});
	
	$("#homeDataLink").die("click").live("click", function(){
		toggleControls("on");
		$.mobile.changePage($("#myRoutine"),"slide");
	});
	
	resetInfo.die("click").live("click", function(){
		// refresh the date field to enabled,
		// should only be disabled when editing a routine
		$("#startDate").textinput("enable");
		restoreDefault();
		});
	
	doSearch.die("keydown").live("keydown", function(e){
		// keydown function for the search field.
		// when the user presses enter (13) after typing,
		// it calls the search function.
		if (e.which == 13) {
			alert("Sorry, function unavailable!");
			};
		});
	
	ctaLink.die("click").live("click", function() {
		// resets all data but doesn't refresh the radio
		// and checkbox buttons
		restoreDefault(false);
		$("#startDate").textinput("enable");
		});
		
		// when the routines external pageshows to extract the
		// url data param and display the routines based on that value
		$("#routinehome").die("pageshow").live("pageshow", function(){
			listMaker($(this).data("url"));
		});
	
});