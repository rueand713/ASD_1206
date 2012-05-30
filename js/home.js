/*		Rueben Anderson
		11/13/2011
		MIU 1111
		Project 4
*/

// Wait until the document is ready
$(document).ready(function() {


function getCheckBoxValue() {
		// Checks for checkboxes with a checked state
		// Stores empty string for unchecked states & an x for checked states
		var daysArray = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
			exerciseArr = ["Running", "Kickboxing", "Swimming", "Bicycling", "Rowing", "Jump Rope", "Squats",
			"Leg Extension", "Dumbbell Curls", "Bench Press", "Tricep Extension", "Bent Over Rows", "Jumping Jacks",
			"Lunges", "Dips", "Crunches", "Pull Ups", "Push Ups", "Hip Flexor Stretch", "Piriformis Stretch",
			"Hamstring Stretch", "Quad Stretch", "Back Stretch", "Shoulder Stretch", "Walking", "Side Lunges",
			"Step Ups", "Lite Swimming", "Lying Abduction", "Wall Squats"];
	
		for (var l=0; l<daysArray.length; l++) {
			if ($("#" + daysArray[l]).checked) {
				day[l] = "×";		// ascii value for multiplication symbol
			}
				else {
					day[l] = ""
				};
		};
		
		for (var j=0; j<exerciseArr.length; j++) {
			var newWord = exerciseArr[j];
			
			for (var k=0, noSpace=""; k < newWord.length; k++) {
			// Eliminates the white spaces (if any) in the string
				if (!(newWord.charAt(k)==" ")) {
					noSpace += newWord.charAt(k);
				};
			};
			// uncapitalize first letter of each string in the array
			var firstLetter = noSpace.charAt(0);
				noSpace = firstLetter.toLowerCase() + noSpace.substring(1,noSpace.length);
			
			if ($("#" + noSpace).checked) {
				exerciseType = exerciseArr[j];		// stores the id of the radio box that is checked
			};										// using the newly formed strings but stores the unedited version of the strings
		};											// this is for aesthetic purposes when retrieving the data.
	};

	function setCheckBoxValue(item) {
		// Checks for checkboxes with a checked state
		// Adds a checked value to the checked attribute for true
		
			if (item.sun[1] == "×") {
				$("#sunday").checked = "checked";
			}
			
			if (item.mon[1] == "×") {
				$("#monday").checked = "checked";
			}
			
			if (item.tue[1] == "×") {
				$("#tuesday").checked = "checked";
			}
			
			if (item.wed[1] == "×") {
				$("#wednesday").checked = "checked";
			}
			
			if (item.thu[1] == "×") {
				$("#thursday").checked = "checked";
			}
			
			if (item.fri[1] == "×") {
				$("#friday").checked = "checked";
			}
			
			if (item.sat[1] == "×") {
				$("#saturday").checked = "checked";
			}
			
			for (var k=0, noSpace=""; k < item.routineType[1].length; k++) {
			// Eliminates the white spaces (if any) in the string
				if (!(item.routineType[1].charAt(k)==" ")) {
					noSpace += item.routineType[1].charAt(k);
				};
			};
			// uncapitalize first letter of the string
			var firstLetter = noSpace.charAt(0);
				noSpace = firstLetter.toLowerCase() + noSpace.substring(1,noSpace.length);
				$("#" + noSpace).checked = "checked";
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
			name: ["Routine:", $("#routineName").value],
			location: ["Location:", $("#routineLoc").value],
			routineType: ["Workout:", exerciseType],
			sun: ["Sun:", day[0]],
			mon: ["Mon:", day[1]],
			tue: ["Tue:", day[2]],
			wed: ["Wed:", day[3]],
			thu: ["Thu:", day[4]],
			fri: ["Fri:", day[5]],
			sat: ["Sat:", day[6]],
			reDu: ["Reps/Duration:", $("#workout").value],
			notes: ["Comments:", $("#comments").value],
			date: ["Start:", $("#startDate").value]
		};
	
		localStorage.setItem(id, JSON.stringify(item));
		isOld = false;
		$("#startDate").attr("disabled", "");
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


	function resetData() {
		// Set defaults for the form
		$("#sunday").checked = "";
		$("#monday").checked = "";
		$("#tuesday").checked = "";
		$("#wednesday").checked = "";
		$("#thursday").checked = "";
		$("#friday").checked = "";
		$("#saturday").checked = "";
		$("#routineName").value = "";
		$("#workout").value = 30;
		$("#comments").value = "";
		$("#routineLoc").value = "";
		$("#startDate").value = "";
		
		var radios = document.forms[0].exType;
		
		for (var j=0; j<radios.length; j++) {
			radios[j].checked = "";
		};
		
		// Reset the jQuery data fields for the list
		$("#aero").attr("data-collapsed", "true");
		$("#anaero").attr("data-collapsed", "true");
		$("#calisth").attr("data-collapsed", "true");
		$("#flex").attr("data-collapsed", "true");
		$("#matern").attr("data-collapsed", "true");
		
		//resetErrMsg();		
	};
	

	function restoreDefault() {
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
		
		search = false;
		searchVal = "";
		storCnt = 0;
		toggleControls("off");
		
		// Set defaults for the form
		$("#sunday").checked = "";
		$("#monday").checked = "checked";
		$("#tuesday").checked = "";
		$("#wednesday").checked = "checked";
		$("#thursday").checked = "";
		$("#friday").checked = "checked";
		$("#saturday").checked = "";
		$("#routineName").value = "";
		$("#workout").value = 30;
		$("#comments").value = "";
		$("#routineLoc").value = "";
		$("#startDate").value = yrCheck + "-" + moCheck + "-" + dayCheck;
		
		var radios = document.forms[0].exType;
		
		for (var j=0; j<radios.length; j++) {
			radios[j].checked = "";
		};
		
		// Reset the jQuery data fields for the list
		$("#aero").attr("data-collapsed", "true");
		$("#anaero").attr("data-collapsed", "true");
		$("#calisth").attr("data-collapsed", "true");
		$("#flex").attr("data-collapsed", "true");
		$("#matern").attr("data-collapsed", "true");
		
		//resetErrMsg();
	};

	function toggleControls(m) {
		switch(m) {
			case "on":
				$("#routineForm").hide();
				$("#clearLists").show();
				$("#showData").hide();
				$("#addNew").show();
				$("#body").show();
				break;
			case "off":
				$("#routineForm").show();
				$("#clearLists").show();
				$("#showData").show();
				$("#addNew").hide();
				$("#body").hide();
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
						bod.removeChild(divCount[1]);
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
		/*	if (name[0].charAt(j) === " ") {
				name.push(name[0].substring(j2+1, j));
				j2 = j;
			};*/
			name = name[0].split(" ");
		};
			//	name2 = name[0].substring(j2+1, name[0].length);
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
			// Store each word in the string
		/*	if (workout[0].charAt(h) === " ") {
				workout.push(workout[0].substring(h2+1, h));
				h2 = h;
			};*/
			workout = workout[0].split(" ");
		};
			//	work2 = workout[0].substring(h2+1, workout[0].length);
		};	
				workout.push(tempWork);
				
		// Eliminate special characters from search string
		for (var i=0, i2=-1; i < serch[0].length; i++) {
			if (serch[0].charAt(i).search(/\W/) ==-1 || serch[0].charAt(i).search(/\s/) !=-1) {
				tempSerch += serch[0].charAt(i);
			}
		/*	// Store each word in the string
			if (serch[0].charAt(i) === " ") {
				serch.push(serch[0].substring(i2+1, i));
				i2 = i;
			};
				serch2 = serch[0].substring(i2+1, serch[0].length);*/
		};
				//serch.push(serch2);
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


	function getData() {
			if (fromEdit === true) {
				fromEdit = false;
				restoreDefault();
			};
			
			storCnt = 0;
			toggleControls("on");
			$("#startDate").attr("disabled", "");
					
			if (localStorage.length === 0) {
				autoFillData();
				alert("There is no data in Local Storage! Default data has been added.");
			};
			
			// Reset the data div
			$("#body").html("");
			
			//Write data from local storage to browser
		/*var makeDiv = document.createElement("div"),
			makeList = document.createElement("ul"),
			makeAnc = document.createElement("a");
			
			makeDiv.attr("id", "routines");
			makeDiv.appendChild(makeList);
			$("#body").appendChild(makeDiv);
			$("#routines").show();
			makeAnc.attr("id", "tOrder");
			makeAnc.attr("href", "#");*/
			
			$("#body").append("<div id='routines'></div>");		//makeDiv given id appended to body div
			$("<ul id='topUl'></ul>").appendTo("#routines");	//makeList appended to makeDiv
			$("#routines").show();	// set to display
			$("<a href='#' id='tOrder'></a>").appendTo("#topUl");	// makeAnc appended to makeList
			
		if (orderType == "new") {
			$("#tOrder").html("[Ordered by Newest]").attr("focused", "false");
			}
				else {
					$("#tOrder").html("[Ordered by Oldest]").attr("focused", "true");
				};
				
			//makeList.appendChild(makeAnc);
		//	$("#tOrder").bind("click", changeOrder);
			
		var newsStream = getNewsStream();

			// Populates list with the object
		for (var k=0; k<localStorage.length; k++) {
			/*var makeLi = document.createElement("li"),
				linksLi = document.createElement("li"),
				makeTitle = document.createElement("a"),
				makeSubList = document.createElement("ul"),
				makeImg = document.createElement("img");*/
			
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

						
						/*makeTitle.attr("href", "#");
						makeTitle.attr("id", "titleControl" + storCnt);
						makeTitle.attr("focused", "false");
						makeLi.attr("id", "title" + storCnt);
						makeImg.attr("id","routineImg"+storCnt);
						makeImg.attr("src","images/maximize.png");
						makeTitle.appendChild(makeImg);
						makeTitle.appendChild(document.createTextNode(newObj.name[1]));
						makeList.appendChild(makeTitle);
						makeList.appendChild(makeLi);*/
						
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
							
							
								/*var makeSubLi = document.createElement("li"),
									optSubText = newObj[n][0] + " " + newObj[n][1];
									
									makeSubList.appendChild(makeSubLi);
									makeSubLi.innerHTML = optSubText;
									makeSubList.appendChild(linksLi);*/
							z++
						};
						
						// linksLi created and appended to makeSubList
						$("<li id='links" + k + "'></li>").appendTo("#subUl" + storCnt);
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
			for (var k=0, noSpace=""; k < imgName.length; k++) {
			// Eliminates the white spaces (if any) in the string
				if (!(imgName.charAt(k)==" ")) {
					noSpace += imgName.charAt(k);
				};
			};
			// uncapitalize first letter of each string in the array
			var firstLetter = noSpace.charAt(0);
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
		
		/*var imageLi = document.createElement("li"),
			newImg = document.createElement("img"),
			setSrc = newImg.attr("src", "images/" + imgName + ".png");*/
			
			$("<li id='img" + index + "'></li>").appendTo("#subUl" + index);
			$("<img src='images/" + imgName + ".png' />").appendTo("#img" + index);
		
	};


	// JSON Object which will auto populate local storage.
	function autoFillData() {
		// Store the JSON object into local storage
		for (var n in json) {
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		};
	};


	/* Make Routine Links
	   Create the edit and delete links for reach stored item when displayed. */
	function makeRoutineLinks(key, index) {
		
			// Define edit delete link variables
		/*var editLink = document.createElement("a"),
			editText = "Edit Routine",
			deleteLink = document.createElement("a"),
			deleteText = "Delete Routine";
			
			// Add edit single routine link
			editLink.href = "#";
			editLink.key = key;
			editLink.innerHTML = editText;
			linksLi.appendChild(editLink);*/
			
			$("<a href='#' key='" + key + "' id='edit" + index + "'>Edit Routine</a>").appendTo("#links" + index);
			$("<br/>").appendTo("#links" + index);
			$("<a href='#' key='" + key + "' id='del" + index + "'>Delete Routine</a>").appendTo("#links" + index);
			$("#edit" + index).bind("click", editRoutine);
			$("#del" + index).bind("click", deleteRoutine);
			
			// Add line break
		/*var breakTag = document.createElement("br");
			linksLi.appendChild(breakTag);	
			
			// Add delete single routine link
			deleteLink.href = "#";
			deleteLink.key = key;
			deleteLink.bind("click", deleteRoutine);
			deleteLink.innerHTML = deleteText;
			linksLi.appendChild(deleteLink);*/
			
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
		/*	//Determine which option has been toggled on
			var	newId = $("tOrder").attr("focused");
			
			if (newId === "false") {
					orderType = "old";
				}
					else if (newId === "true") {
						orderType = "new";
					};
			*/
			//Clear old get data gathered
		var bod = $("body"),
			part = $("#routines");
			bod.removeChild(part);
			
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

	function deleteRoutine() {
		var ask = confirm("Are you sure you want to delete this routine?");
		
		if (ask) {
			localStorage.removeItem(this.key);
			alert("Routine has been successfully removed!");
			window.location.reload();
		}
			else {
				alert("The routine was not deleted.");
			};
	};

	function editRoutine() {
		// Reset error messages just incase the user inputs invalid info and then chooses 
		// to edit another routine. Which would not reset them because they reset in the validator function.
		//resetErrMsg();
		
		// The routine is being edited so a true value is assigned to the isOld variable to 
		// prevent the validator from forcing a new updated start date and to prevent backdating the field is disabled.
		if (this.key) {
			isOld = true;
			$("#startDate").attr("disabled", "disabled");
		};
		
		// Grab the data from the Local Storage item
		var value = localStorage.getItem(this.key),
			item = JSON.parse(value);
			
			// Shows the form
			toggleControls("off");
	
			// Populate the form fields with current lcoalStorage values.
			$("#routineName").value = item.name[1];
			$("#routineLoc").value = item.location[1];
			$("#workout").value = item.reDu[1];
			$("#comments").value = item.notes[1];
			$("#startDate").value = item.date[1];
			
			// Function that populates the checkbox fields.
			setCheckBoxValue(item);
			
			// Remove the initial listener from the input button
			save.removeEventListener("click", storeData);
			// Change submit button value to edit button
			$("#submit").value = "Edit Routine";
			
		var	editSubmit = $("#submit");
			// Save the key value in this function as a property of the edit submit event
			// So the value may be reused when the edited data is saved.
			editSubmit.bind("click", validate);
			editSubmit.key = this.key;
			
			fromEdit = true;
			
			// Make sure to set the exercise type to block
		//	addExerciseType();
	};

	
	/*function resetErrMsg() {
		var	getRoutine = $("#routineName"),
			getLocation = $("#routineLoc"),
			getWorkout = $("#workout"),
			getStartDate = $("#startDate"),
			getFrequency = $("#rtFreq");
			
		//Reset top level error messages
			errMsg.innerHTML = "";
			errMsg.style.color = "#CC9B73";
			getRoutine.style.border = "1px solid black";
			getLocation.style.border = "1px solid black";
			getWorkout.style.border = "1px solid black";
			getStartDate.style.border = "1px solid black";
		//	getFrequency.style.border = "none";
		//	$("workout2").style.border = "none";
		// Reset local error messages
			$("#errorText").hide();
			$("#errorSelect").hide();
			$("#errorRange").hide();
			$("#errorCheckbox").hide();
			$("#errorRadio").hide();
			$("#errorDate").hide();
	
	};*/
	
	/*function validate(e) {
		// Define the elements we want to check
		var	getRoutine = $("routineName"),
			getLocation = $("routineLoc"),
			getWorkout = $("workout"),
			getStartDate = $("startDate"),
			dayValidator = [
				[$("sunday")],
				[$("monday")],
				[$("tuesday")],
				[$("wednesday")],
				[$("thursday")],
				[$("friday")],
				[$("saturday")]
			],
			validateRadio = document.forms[0].exType;
			
			// Call function to reset error messages
			resetErrMsg();
			
			
			// Get error messages
		var	messageArr = [],
			err = "";
			
			// Routine validation
			if (getRoutine.value === "") {
				err = "Please input a name for this routine.";
			
				getRoutine.style.border = "2px solid #990000";
				$("errorText").show();
				messageArr.push(err);
			};
			
			// Exercise validation
			if (getLocation.value === "--Please Select A Location--") {
				err = "Please choose an exercise location."
				
			//	getLocation.style.border = "2px solid #990000";
				$("errorSelect").show();
				messageArr.push(err);
			};
		
			// Workout validation
			if (getWorkout.value <= 0) {
				err = "Please choose a value greater than 0.";
				
				getWorkout.style.border = "2px solid #990000";
				$("errorRange").show();
				messageArr.push(err);
			};
			
			
			// Checkbox validation
			for (var z=0, err=""; z < dayValidator.length; z++) {
				if (dayValidator[z][0].checked) {
					err += "chk";
				}
					else {
						err += "";
					};
			};
			
			if (err === "") {
				err = "Please choose atleast 1 day for this routine.";
				
			//	$("rtFreq").style.border = "1px solid #990000";
				$("errorCheckbox").show();
				messageArr.push(err);
			};
			
			// Radiobox validation
			for (var r=0, err=""; r < validateRadio.length; r++) {
				if (validateRadio[r].checked) {
					err += "chk";
				}
					else {
						err += "";
					};
			};
			
			if (err === "") {
				err = "Please choose an exercise for this routine.";
				
			//	$("workout2").style.border = "1px solid #990000";
				$("errorRadio").show();
				messageArr.push(err);
			};
			
			
			// StartDate validation
			var re = /\d{4}-{1}\d{2}-{1}\d{2}/;
			if (re.test(getStartDate.value) === false) {
				err = "Please enter a date in valid format.";
				
				getStartDate.style.border = "2px solid #990000";
				$("errorDate").show();
				messageArr.push(err);
			}
				else {	
					if (isOld === false) {
						var startVal = getStartDate.value,
							year = startVal.substring(0, 4),
							month = startVal.substring(5, 7),
							day = startVal.substring(8, 10),
							today = new Date(),
							inDate = new Date();
							inDate.setFullYear(year);
							inDate.setDate(day);
							inDate.setMonth(month-1);
												
						if (Date.parse(inDate) < Date.parse(today)) {
							err = "Please enter the current date or a future date.";
						
							getStartDate.style.border = "2px solid #990000";
							$("errorDate").show();
							messageArr.push(err);
						};
					};
				};
				
			
						
			// If there are errors, display them on the screen
			if (messageArr.length >= 1 ) {
				for (var u=0; u < messageArr.length; u++) {
					var txt = document.createElement("li");
					
					txt.innerHTML = messageArr[u];
					errMsg.appendChild(txt);
				};
				errMsg.style.color = "#990000";
				e.preventDefault();
				return false;
			}
				else {
					// If everything is ok save the data. Send the key value from the edit data function
					// This key value was passed through the editSubmit event listener as a property.
					storeData(this.key);
				};
		
		return false;	
	};*/
	
	function validate() {
		myForm.validate({
			invalidHandler: function(form, validator) {},
			submitHandler: function() {
				storeData(this.key);
			}
		});	
	};

	function redirect() {
		var addie = $("#body"),
			subbie = $("#routineForm");
		
		subbie.style.display = "block";
		addie.style.display = "none";
		$.mobile.changePage($("#home"),"slide");
		restoreDefault();
		window.location.reload();
	};


	function clearData() {
		if (localStorage.length === 0) {
			alert("There is no data to clear!");
		}
			else {
				localStorage.clear();
				alert("All routines have been removed!");
				window.location.reload();
				return false;
			};
	return false;
	};
	
	
	function setInlayVars() {
		restoreDefault();
		
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
					$("#" + noSpace).checked = "checked";
					$("#" + newPrefix).attr("data-collapsed", "false");
				};
				w++;
			};
		};
	
	};
	
	
	function setInlayLinks() {
		
		var container = [
			["aero",["Running", "Kickboxing", "Swimming", "Bicycling", "Rowing", "Jump"]],
			["anaero",["Squats", "Leg", "Dumbbell", "Bench", "Tricep", "Bent"]],
			["calisth",["Jumping", "Lunges", "Dips", "Crunches", "Pull", "Push"]],
			["flex",["Hip", "Piriformis", "Hamstring", "Quad", "Back", "Shoulder"]],
			["matern",["Walking", "Side", "Step", "Lite", "Lying", "Wall"]]
		];
			
		for (var x=0; x<container.length; x++) {
		
			for (var y=0; y<container[x][1].length; y++) {
				var setClick = container[x][0] + container[x][1][y];
				$("#" + setClick).bind("click", setInlayVars);
			};
		};
	};
	
	
	function getSearch() {
		search = true;
		searchVal = $("#searchField").value;
		
	// Clears out the old local storage to alleviate errors
	// this only exists while polyfilling is implemented in the code.
		localStorage.clear();
		
		if (localStorage.length === 0) {
				autoFillData();
		};
		getData();
		//window.location.reload();
	};
	
	
	function refreshPage() {
		// Goes to the home page and forces a refresh
		$.mobile.changePage($("#home"),"slide");
		window.location.reload();
	
	};
	
	
	function toNextApp() {
		// Goes to the Bad App and forces a refresh
		//$.mobile.changePage($("http://rueand713.github.com/MiU-1111-Project3/miu-project3/Bad App/ref.html"),"slide");
		//window.location.reload();
	
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
		clearLink = $("#clearLists"),
		addLink = $("#addNew"),
		doSearch = $("#goButton"),
		ctaLink = $("#ctaLink"),
		resetInfo = $("#reset"),
		myForm = $("#routineForm");
		
		
	showLink.bind("click", getData);
	clearLink.bind("click", clearData);
	save.bind("click", validate);
	resetInfo.bind("click", resetData);
	addLink.bind("click", redirect);
	doSearch.bind("click", getSearch);
	ctaLink.bind("click", restoreDefault);
	$("#homeLink").bind("click", refreshPage);
	//$("#appLink").bind("click", toNextApp);
	
	// Add Event Listener to List-Inlay home page
	setInlayLinks();
	
});