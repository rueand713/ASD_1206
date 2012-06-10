function(doc) {
	var colon = doc._id.indexOf(":");
  if (doc._id.substr(0, colon + 1) === "anaerobics:") {
	  emit(doc._id.substr(colon + 1), {
    	"name":doc.name,
    	"location": doc.location,
    	"routinetype": doc.routinetype,
    	"sun": doc.sun,
    	"mon": doc.mon,
    	"tue": doc.tue,
    	"wed": doc.wed,
    	"thu": doc.thu,
    	"fri": doc.fri,
    	"sat": doc.sat,
    	"repdur": doc.repdur,
    	"notes": doc.notes,
    	"date": doc.date
    });
  }
};