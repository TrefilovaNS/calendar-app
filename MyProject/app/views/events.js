function idbOK() {
return "indexedDB" in window;
}


$(document).ready(function() {

if(!idbOK()){
  return console.log("Not suported IndexedDB")
}
$("#addEvent").on("click", addEvent);
$('#clrAllInputs').on("click", clrAllInputs)
$(document.body).on('click', '.dltBtn', dltEvent); 
$(document.body).on('click', '.updBtn', updEvent); 

 $('#datePicker .time').timepicker({
        'showDuration': true,
        'timeFormat': 'H:i',
    });

 $('#datePicker .date').datepicker({
        'format': 'yyyy-mm-dd',
        'autoclose': true
    });
 var basicExampleEl = document.getElementById('datePicker');
 var datepair = new Datepair(basicExampleEl);


var db = new Dexie("dexie1");
db.version(1).stores({
events:"_id,name,description,startDate,endDate,place"
});
db.open();
console.dir(db);



function addEvent(e){
  var name = $("#name").val();
  var description = $("#description").val();
  var startDate = $("#startDate").val();
  var startTime = $("#startTime").val();
  var endDate = $("#endDate").val();
  var endTime = $("#endTime").val();
  var place = $("#place").val();


  db.events.add(
  { _id: String(Date.now()), name: name, description: description, startDate: startDate, startTime:startTime, endDate: endDate, endTime:endTime, place: place}
  ).then(function() {
  name.value = '';
  description.value = '';
  console.log('Note added.');
  })
  .then(refreshView)
  .catch(function(err) {
  });

  clrAllInputs();

}

function clrAllInputs(e){
  $("#name").val('');
  $("#description").val('');
  $("#startDate").val('');
  $("#startTime").val('');
  $("#endDate").val('');
  $("#endTime").val('');
  $("#place").val('');

}



  function dltEvent(e) {
    e.preventDefault();
    if (e.target.hasAttribute('ide')) {
      db.events.where('_id').equals(e.target.getAttribute('ide')).delete()
        .then(refreshView);
    }
  }

  function updEvent(e){

  
  // var description = $("#description").val();
  // var startDate = $("#startDate").val();
  // var startTime = $("#startTime").val();
  // var endDate = $("#endDate").val();
  // var endTime = $("#endTime").val();
  // var place = $("#place").val();

    e.preventDefault();
    var id = e.target.getAttribute('ide');

  db.events.get(id).then(function(event) { 
  $("#name").val(event.name);
  $("#description").val(event.description);
  $("#startDate").val(event.startDate);
  $("#startTime").val(event.startTime);
  $("#endDate").val(event.endDate);
  $("#endTime").val(event.endTime);
  $("#place").val(event.place);



    console.log(event);
     }); 

    // db.events.put( { name: name, description: description, startDate: startDate + " " + startTime, endDate: endDate + " " + endTime, place: place, key } )
    // .then(function() { 
    //   console.log('Note updated.'); 
    // })
    // .catch(function(err) { 
    // });



  }

  function refreshView() {
    return db.events.toArray()
      .then(renderAllEvents);
       
  }

  function renderAllEvents(events) {
    var html = '';
    events.forEach(function(event) {
      html += todoToHtml(event);
    });
    $("#list").html(html);
    
    console.log('In render');
  }

  function todoToHtml(event) {
    return '<tr><td>'+event.name+'</td><td>'+event.description+'</td><td><div class="btn-group" role="group"><button class="btn btn-default dltBtn" ide="'+event._id+'">delete</button><button class="btn btn-default updBtn" ide="'+event._id+'">update</button></div></td></tr>';
  }
// }());
});