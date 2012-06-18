function(doc) {
  if (doc.type[1] === "Flexibility") {
    emit(doc._id, {
    	"_id": doc._id,
    	"_rev": doc._rev,
    	"type": doc.type,
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