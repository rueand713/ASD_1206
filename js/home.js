/*	Rueben Anderson
	05/28/2012
	ASD 1206
*/

// Wait until the document is ready
$(document).bind("pageinit", function() {


function getCheckBoxValue() {
		// Checks for checkboxes with a checked state
		// Stores empty string for unchecked states & an x for checked states
		var radios = $("input[type='radio']"),
		    boxes  = $("input[type='checkbox']");
		
		for (var i=0; i < boxes.length; i++) {
			if ($(boxes[i]).prop("checked")) {
				day[i] = "×";
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
		
			if (item.sun[1] == "x") {
				$("#sunday").prop("checked", true);
			};
			
			if (item.mon[1] == "x") {
				$("#monday").prop("checked", true);
			};
			
			if (item.tue[1] == "x") {
				$("#tuesday").prop("checked", true);
			};
			
			if (item.wed[1] == "x") {
				$("#wednesday").prop("checked", true);
			};
			
			if (item.thu[1] == "x") {
				$("#thursday").prop("checked", true);
			};
			
			if (item.fri[1] == "x") {
				$("#friday").prop("checked", true);
			};
			
			if (item.sat[1] == "x") {
				$("#saturday").prop("checked", true);
			};
			
			// checks the proper radio button based on the routine type and refreshes the form state
			$("input[type='radio'][value='" + item.routineType[1] + "']").prop("checked", true);
			
			// refresh the checkbox and radio buttons
			refreshButtons();

	};

	function storeData(key) {
		
		// Checks if there is no key, which means this is a new routine and needs a new key.
		if (!key) {	
			var id = Math.floor(Math.random()*100000001),
				isNew = true;
		} 
			else {
				// Set the id to the existing key that is being edited so that the data will be overwritten.
				// This key is the same key being passed from the editSubmit event handler.
				var	id = key,
					isNew = false;
			};
	
	// Stores all form field values in an object.
	// Object properties contain arrays with the form lable and input value.
		getCheckBoxValue();
		var item = {
			name: ["Routine:", $("#routineName").val()],
			location: ["Location:", $("#routineLoc").val()],
			routineType: ["Workout:", exerciseType],
			sun: ["Sun:", day[0]],
			mon: ["Mon:", day[1]],
			tue: ["Tue:", day[2]],
			wed: ["Wed:", day[3]],
			thu: ["Thu:", day[4]],
			fri: ["Fri:", day[5]],
			sat: ["Sat:", day[6]],
			reDu: ["Reps/Duration:", $("#workout").val()],
			notes: ["Comments:", $("#comments").val()],
			date: ["Start:", $("#startDate").val()]
		};
	
		localStorage.setItem(id, JSON.stringify(item));
		isOld = false;
		$("#startDate").textinput("disable");
		if (isNew === true) {
			alert("Routine Added!");
		}
			else {
				alert("Routine Updated!");
			};
		
		$.mobile.changePage($("#home"),"slide");
		restoreDefault();
		location.reload();
	};
	

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
		
		// Reset the jQuery data fields for the list
		/*$("#aero").attr("data-collapsed", "true");
		$("#anaero").attr("data-collapsed", "true");
		$("#calisth").attr("data-collapsed", "true");
		$("#flex").attr("data-collapsed", "true");
		$("#matern").attr("data-collapsed", "true");*/
		
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
			$("#monday").prop("checked", true);
			$("#wednesday").prop("checked", true);
			$("#friday").prop("checked", true);
		};
		
		
		// refresh the checkbox and radio buttons unless
		// false is passed in
		if (option != false) {
			refreshButtons();
		};
	};

	
	function refreshButtons() {

		var radios = $("input[type='radio']"),
		    boxes  = $("input[type='checkbox']"),
		    select = $("select"),
		    slider = $("input[type='range']");
	
		// refreshes the radio buttons
		for (var j=0; j<radios.length; j++) {
			$(radios[j]).checkboxradio("refresh");
		};
		
		// refreshes the checkboxes
		for (var j=0; j<boxes.length; j++) {
			$(boxes[j]).checkboxradio("refresh");
		};
		
		// refreshes the select menu
		for (var j=0; j<select.length; j++) {
			$(select[j]).selectmenu("refresh");
		};
		
		// refreshes the slider
		for (var j=0; j<slider.length; j++) {
			$(slider[j]).slider("refresh");
		};
	};
	
	function toggleControls(m) {
		switch(m) {
			case "on":
				$("#routineForm").hide();
				$("#clearLists").show();
				$("#showData").hide();
				$("#addNew").show();
				$("#listForm").show();
				break;
			case "off":
				$("#routineForm").show();
				$("#clearLists").show();
				$("#showData").show();
				$("#addNew").hide();
				$("#listForm").hide();
				break;
			default:
				return false;
		};
	return false;
	};

	function parseTheDate(startVal) {
			var	year = startVal.substring(0, 4),
				month = startVal.substring(5, 7),
				day = startVal.substring(8, 10),
				inDate = new Date(Date.UTC(2011,10,10,0,0,0));
				
				inDate.setFullYear(year);
				inDate.setDate(day);
				inDate.setMonth(month-1);
				
			return Date.parse(inDate);
	};

	function getNewsStream() {
			
		var	values = [],
			values2 = [];
			
		// Takes the date values passed in from newObj sorts the list to find the greatest values
		// Then arranges those from least to greatest
		
		for (var i=0; i < localStorage.length; i++) {
			var key = localStorage.key(i),
				val = localStorage.getItem(key),
				newObj = JSON.parse(val),
				coreVal = newObj.date[1],
				startVal = parseTheDate(newObj.date[1])
				
				values2 = [coreVal, startVal];
				values.push(values2);
		
		};
		
		var	 newArray = [],
			 newVal=[],
			 nVal = values;
	
		// Sorts the values passed in and returns the greatest value per comparision
		// Then pushes that value into an array
		for (var y=0; y<values.length; y++) { 
			newVal = nVal[y][1];
		   
		   for (var x=0; x<values.length; x++) {
				newVal = Math.max(newVal, values[x][1]);
			
			};
		
			newArray.push(newVal);
			// Compares the newly pushed value to the original array
			// Replaces the value that matches in the original array to zero to prevent duel comparisons
			for (var z=0; z<values.length; z++) {
				if (values[z][1] == newVal) {
					values[z][1] = 0;
					break;		// Prevents replacing valid duplicate entries
				};
			};
		};
	
	// Determines order orderType set to old will order the list from oldest to newest
	// orderType of new will order the list from newest to oldest.
		if (orderType == "old") {
			var newArr = [];
			// Arranges the newArr from least to greatest using the values in newArray
			for (var n=newArray.length; n > 0; n--) {
					newArr.push(newArray[n-1])
				}; 
			
			} else {
				newArr = newArray;
			};
	
		return newArr;
	};

	function checkForDubs() {
		var tags = $("div");
		
		if (tags != null) {
			for (var i=0, divCount=[]; i<tags.length; i++) {
				var idAttr = $(tags[i]).attr("id");
				
				if (idAttr === "routines") {
					divCount.push(tags[i]);
				};
			
				if (divCount.length >1) {
					var bod = $("#body");
					
					if (bod != null) {
						bod.remove(divCount[1]);
					};
				};
			};
		};
	};

	function readyJSON(json) {
		var name = [json.name[1].toLowerCase()],
			workout = [json.routineType[1].toLowerCase()],
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


	function getData(choice) {
		// Reset the data in the div
		$("#body").empty();
		
		if (fromEdit === true) {
			fromEdit = false;
			restoreDefault();
		};
		
		storCnt = 0;
		toggleControls("on");
		$("#startDate").textinput("enable");
				
		if (localStorage.length === 0) {
			autoFillData(choice);
			//alert("There is no data in Local Storage! Default data has been added.");
		};
			
		$("#body").append("<div id='routines'></div>");		//makeDiv given id appended to body div
		$("<ul id='topUl'></ul>").appendTo("#routines");	//makeList appended to makeDiv
		$("#routines").show();					// set to routines div to display
		$("<a href='#' id='tOrder'></a>").appendTo("#topUl");	// makeAnc appended to makeList
		
		if (orderType == "new") {
			$("#tOrder").html("[Ordered by Newest]").attr("focused", "false");
		}
		else {
			$("#tOrder").html("[Ordered by Oldest]").attr("focused", "true");
		};
				
		//	$("#tOrder").bind("click", changeOrder);
			
		var newsStream = getNewsStream();

			// Populates list with the object
		for (var k=0; k<localStorage.length; k++) {
		
			for (var f=0, z=0; f < newsStream.length; f++) {
				var key = localStorage.key(f),
					value = localStorage.getItem(key),
					newObj = JSON.parse(value),
					objDate = parseTheDate(newObj.date[1]),
					searchAt = readyJSON(newObj);
				if (search === true && searchAt === true || search === false) {		
					if (objDate == newsStream[k]) {
						
						//makeTitle created, given attributes and appended to makeList
						$("<a href='#' focused='false' id='titleControl" + storCnt + "'></a>").appendTo("#topUl");
						
						// makeTitle innerHtml set
						$("#titleControl" + storCnt).html(newObj.name[1]);
						
						// makeImg created, given attributes and prepended to makeTitle
						$("<img src='images/maximize.png' id='routineImg" + storCnt + "' />").prependTo("#titleControl" + storCnt);
						
						// makeLi appended to makeList, given an id
						$("<li id='title" + storCnt + "'></li>").appendTo("#topUl");
						
						// makeSubList appended to makeLi, given id
						$("<ul id='subUl" + storCnt + "'></ul>").appendTo("#title" + storCnt);
						
						// sets to display
						$("#title"+storCnt).hide();
						
						//makeLi.appendChild(makeSubList);
						getImage(newObj.routineType[1], storCnt);
						$("#titleControl"+storCnt).show();
						
						z = 0;
						// Populates the list object's items
						for (var n in newObj) {
							var optSubText = newObj[n][0] + " " + newObj[n][1];

						
							// makeSubLi given an id and appended to makeSubList
							$("<li id='item" + z + "" + storCnt + "'></li>").appendTo("#subUl" + storCnt);
							
							// makeSubLi given innerHTML
							$("#item" + z + "" + storCnt).html(optSubText);
							z++
						};
						
						// linksLi created and appended to makeSubList
						$("<li id='links" + k + "' key='" + key + "'></li>").appendTo("#subUl" + storCnt);
						storCnt++;
					};
				};
			};
				// Creates the edit and delete links for each routine in local storage.
				makeRoutineLinks(localStorage.key(k), k); 
		};
		checkForDubs();
		setListAttributes();
		if (search === false) {
			toggleList(true);
		} else {
				toggleList();
			};
		search = false;
		searchVal = "";
	};


	// Get the appropriate image for the exercise category
	function getImage(imgName, index) {
		
		// uncapitalize first letter of each string in the array
		var noSpace = imgName,
		    firstLetter = noSpace.charAt(0);
		    noSpace = firstLetter.toLowerCase() + noSpace.substring(1,noSpace.length);
		
		// Get image file names by returning the substring from index 0 to the first space
		imgName = noSpace;
		//imgName = $("#" + imgName).val;
		
		var endMark = imgName.indexOf(" ");
		
		if (endMark === -1) {
			imgName = imgName.substring(0,imgName.length);
		}
		else {
			imgName = imgName.substring(0, endMark);
		};
	
		// creates the img elements
		$("<li id='img" + index + "'></li>").appendTo("#subUl" + index);
		$("<img src='images/" + imgName + ".png' />").appendTo("#img" + index);
		
	};


	// passed in object (xml, csv, json) which will be stored in local storage.
	function autoFillData(dataType) {
		var fillData;
		
		switch(dataType) {
			case "csv":
				newXHR("xhr/data.csv", "text", "GET", false, parseCSV);
				fillData = csv;
				break;
			
			case "xml":
				newXHR("xhr/data.xml", "xml", "GET", false, parseXML);
				fillData = xml;
				break;
			
			case "json":
			default:
				newXHR("xhr/data.json", "json", "GET", false, parseJSON);
				fillData = json;
				break;
		};
		
		// Store the JSON object into local storage
		for (var n in fillData) {
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(fillData[n]));
		};
		//alert(dataType.toUppercase() + " Data Loaded!");
		
	};


	/* Make Routine Links
	   Create the edit and delete links for reach stored item when displayed. */
	function makeRoutineLinks(key, index) {
		// Define edit delete link variables
		var keyId = $("#links" + index).attr("key");
		
		$("<a href='#' id='edit" + index + "'>Edit Routine</a>").appendTo("#links" + index);
		$("<br/>").appendTo("#links" + index);
		$("<a href='#' id='del" + index + "'>Delete Routine</a>").appendTo("#links" + index);
		$("#edit" + index).bind("click", function(){
			editRoutine(keyId);
			});
		$("#del" + index).bind("click", function() {
			deleteRoutine(keyId);
			});
	};


	function setListAttributes() {
		for (var n = 0, newEvent=""; n < storCnt; n++) {
			newEvent = "titleControl" + n;
			if ($("#" + newEvent) != null) {
				$("#" + newEvent).bind("click", toggleList);	
			};
		};
	};


	function changeOrder() {
		/*//Determine which option has been toggled on
		var	newId = $("tOrder").attr("focused");
		
		if (newId === "false") {
				orderType = "old";
			}
				else if (newId === "true") {
					orderType = "new";
				};
		*/
		
		//Clear old get data gathered
		$("body").remove("#routines");	
		getData();
	};

	function toggleList(init) {
		if (init != true) {	
			var re = /Control/gi,
				re1 = /titleControl/gi,
				idClick = this.id,
				storage = storCnt;
			if (idClick != null && storage >0) {
					newId = $("#" + idClick).attr("focused"),
					titler = idClick.replace(re,""),
					imgHandler = idClick.replace(re1,"routineImg");
				
					//Change the display for each control anchor to none
					//Change the images all to maximize
				for (var x = 0; x < storage; x++) {
					$("#title"+x).hide();
					$("#routineImg"+x).attr("src", "images/maximize.png");
				};
				
				// Determine what options to apply by determining which type of click
				// has been initiated. This is determined by the focused attribute.
				if (newId === "false") {
					$("#" + titler).show();
					
					// Set all focus attributes to false (not clicked)
					for (var z = 0; z < storage; z++) {
						var controller2 = $("#titleControl" + z);
						controller2.attr("focused", "false");
					};
					
					// Set the focused attribute of the id passed in to true (clicked)
					// Set the image to minimized
					$("#" + idClick).attr("focused", "true");
					$("#" + imgHandler).attr("src", "images/minimize.png");
				} 
				else {
					// Set the focused attribute of the id passed in to false (unclicked)
					$("#" + titler).hide();
					$("#" + idClick).attr("focused", "false");
					$("#" + imgHandler).attr("src", "images/maximize.png");
				};
			};
		} // end first if condition 
			else {
				for (var l = 0; l < storCnt; l++) {
					$("#title"+l).hide();
					$("#routineImg"+l).attr("src", "images/maximize.png");
				};
			};
	};

	function deleteRoutine(key) {
		var ask = confirm("Are you sure you want to delete this routine?");
		
		if (ask) {
			localStorage.removeItem(key);
			alert("Routine has been successfully removed!");
			location.reload();
		}
			else {
				alert("The routine was not deleted.");
			};
	};

	function editRoutine(key) {
		
		// clears the form of any previous edits
		// doesn't restore "good" defaults or default js form variables
		// but does refresh the radio and checkbox buttons
		restoreDefault(true);
		
		// The routine is being edited so a true value is assigned to the isOld variable to 
		// prevent the validator from forcing a new updated start date and to prevent backdating the field is disabled.
		isOld = true;
		$("#startDate").textinput("disable");
		
		// Grab the data from the Local Storage item
		var value = localStorage.getItem(key),
			item = JSON.parse(value);
			// Shows the form
			toggleControls("off");
	
			// Populate the form fields with current lcoalStorage values.
			$("#routineName").val(item.name[1]);
			$("#routineLoc").val(item.location[1]);
			$("#workout").val(item.reDu[1]*1);
			$("#comments").val(item.notes[1]);
			$("#startDate").val(item.date[1]);
			
			// Function that populates the checkbox fields.
			setCheckBoxValue(item);
			
			// Remove the initial listener from the input button
			save.unbind("click", storeData);
			// Change submit button value to edit button
			//$("#submit span span").html("Edit Routine");
			
			// Save the key value in this function as a property of the edit submit event
			// So the value may be reused when the edited data is saved.
			$("#submit").bind("click", function() {
				validate(key);
				});
			$("#submit").attr("key", key)
			
			fromEdit = true;
			
			// Make sure to set the exercise type to block
		//	addExerciseType();
	};

	
	function validDate(key) {
		var err = false;
		
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
			storeData(key);
		};
	};
			
	
	function validate(key) {
		myForm.validate({
			invalidHandler: function(form, validator) {},
			submitHandler: function() {
				validDate(key);
			}
		});	
	};

	function redirect() {
		restoreDefault();
		refreshPage();
	};


	function clearData() {
		if (localStorage.length === 0) {
			alert("There is no data to clear!");
		}
		else {
			localStorage.clear();
			alert("All routines have been removed!");
			location.reload();
		};
	};
	
	
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
	
	
	function setInlayLinks() {
		var container = $("a[name='categories']");
		
		for (var i=0, id; i < container.length; i++) {
			id = "#" + $(container[i]).attr("id");
			$(id).bind("click", setInlayVars);
		};
	};
	
	
	function getSearch() {
		
		alert("Sorry, function unavailable!");
		/*search = true;
		searchVal = $("#searchField").val();
		
	// Clears out the old local storage to alleviate errors
	// this only exists while polyfilling is implemented in the code.
		localStorage.clear();
		
		if (localStorage.length === 0) {
			autoFillData();
		};
		
		$("#myRoutine").one("pageload", function(){
			window.setTimeout(getData, 500);
			});
		$.mobile.changePage($("#myRoutine"), "slide");
		//location.reload();*/
	};
	
	
	function refreshPage() {
		// Goes to the home page and forces a refresh
		$.mobile.changePage($("#home"),"slide");
		location.reload();
	};
	
	
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
		// connect is the type of connection: syncrhonous (false) or asynchronous (true)
		
		if (!type || typeof(type) != "string") {
			type = "html";	
		};
		
		if (!request || typeof(request) != "string") {
			request = "GET";
		};
		
		if (!success || typeof(success) != "function") {
			console.log("fired");
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
	
	
	// set the json variable to the fetched json
	function parseJSON(jsValue) {
		json = jsValue;	
	};
	
	
	// set the csv variable to the parsed & fetched csv text
	function parseCSV(csValue){
		var csvLineSplit,
		    values = [],
		    keyValues,
		    keys=[];
		    
		function objectCreator(k, v) {
			var newObject = new Object();
			
			for (var n=0; n<k.length; n++) {
				newObject[k[n]] = [v[n][0], v[n][1]];
			};
			
			return newObject;
		};
		
		// split the csv data by new lines
		csvLineSplit = csValue.split(/\n/);
		
		// sets the key to the first index values in csvLineSplit array
		var tempKey = csvLineSplit[0].split(",");
		
		for (var i=0; i<tempKey.length; i++) {
			keys.push(tempKey[i]);
		};
		
		// sets values to only store the key values
		keyValues = csValue.split(/\n/).splice(1);
		
		for (var i=0; i<keyValues.length; i++) {
			values.push(keyValues[i].split(","));
		};
		
		
		// iterates through the length of the values array to create a new parsed array
		// will be split by space followed by quotes and then have the quotes removed
		for (var i=0, kBox, kVal=[]; i<values.length; i++) {
			// temporary container box for values array
			// set to the current index of values
			kBox = values[i];
		
			// iterate through the values in the values array testing for a quoted string match
			// if found the specific index in the array will be split
			for (var j=0, tVal; j<kBox.length; j++) {
				// this is where the quote string tests at
				if ((/["]{1}[\w.]+\s*[\w\s]*[\w"]{1}/gi).test(kBox[j])) {
					tVal = kBox[j].split(/\s{1}["]{1}/);
					for (var n=0; n<tVal.length; n++) {
						tVal[n] = tVal[n].replace(/["]/gi,"");
					};
					
				} else {
					tVal = kBox[j];
					tVal = tVal.replace(/["]/gi, "");
					tVal = tVal.split(/\s+/);
				};
				// sets the keybox to the new parsed tVal values
				kBox[j] = tVal;
			};
			// push the modified values into the kVal (key value) array
				kVal.push(kBox);
		};
		
		for (var i=0, container={}; i<kVal.length; i++) {
			// create an object named container to hold the parsed data objects
			container["routine"+(i+1)] = objectCreator(keys, kVal[i]);
		};
		
		// finally set the global csv variable to the new container object
		csv = container;
	};
	
	
	function parseXML(xmValue) {
		// recieves the xml and appends the childNode data to the document for parsing
		// also empties the div associated to prevent multiple appended sets
		$("#xmlDiv").empty().append(xmValue.childNodes);
		
		var routTag = $("routine"),
		    newXml = {},
		    tagNames = ["name", "location", "routineType", "sun",
				"mon", "tue", "wed", "thu", "fri", "sat",
				"reDu", "notes", "date"];
		
		// iterate through the number of routine elements in the document
		// and dynamically retrieve the html text of each child elements by
		// using the tagNames array. Also stores the html text, into a key value
		// corresponding to the tag the text has been supplied from, in the xmlObject
		for (var i=0; i < routTag.length; i++) {
			var xmlObject = new Object();
			for (var j=0; j < tagNames.length; j++) {
				xmlObject[tagNames[j]] = $(routTag[i]).find(tagNames[j]).text();
			};
			// each object within newXml is called routine #
			newXml["routine" + (i+1)] = xmlObject;
		};
		
		console.log(newXml);
		// iterate through the newXml object for parsing
		for (var key in newXml) {
			// using the tagNames array, dynamically split the data into arrays
			// and store the new parsed information into the proper key value of the object
			for (var i=0; i < tagNames.length; i++) {
				var n = newXml[key][tagNames[i]];
				if (n.indexOf("|") !=-1) {
					newXml[key][tagNames[i]] = n.split("|");
				};
			};
		};
		
		// stores the fully parsed xml data into the global xml variable
		// and empties the div
		xml = newXml;
		$("#xmlDiv").empty();
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
	    fromEdit = false,
	    json, csv, xml;
									
					
					
	// Set the Link & Submit click events						
	var save = $("#submit"),
	    showLink = $("#showData"),
	    clearLink = $("#clearLists"),
	    addLink = $("#addNew"),
	    doSearch = $("#searchField"),
	    ctaLink = $("#ctaLink"),
	    resetInfo = $("#reset"),
	    myForm = $("#routineForm");
		
		
	showLink.bind("click", function(){
		toggleControls("on");
		});
	clearLink.bind("click", clearData);
	save.bind("click", validate);
	resetInfo.bind("click", function(){
		$("#startDate").textinput("enable");
		restoreDefault();
		});
	addLink.bind("click", redirect);
	doSearch.bind("keydown", function(e){
		if (e.which == 13) {
			getSearch();
			};
		});
	ctaLink.bind("click", function() {
		// resets all data but doesn't refresh the radio
		// and checkbox buttons
		restoreDefault(false);
		});
	$("#homeLink").bind("click", refreshPage);
	
	// Function that binds events to List-Inlay home page
	setInlayLinks();
	
	// Refresh the radio and checkbox buttons when the routine page is loaded
	$("#myRoutine").bind("pageload", function(){
		$("#startDate").textinput("enable");
		refreshButtons();
		});
	
	$("#jsonKey").bind("click", function(){
		getData("json");
		});
	
	$("#xmlKey").bind("click", function(){
		getData("xml");
		});
	
	$("#csvKey").bind("click", function(){
		getData("csv");
		});
});