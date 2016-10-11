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
events:"++id,name,description,startDate,endDate,place"
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
    var idEvnt = $("#idEvnt").text();
  
  if(idEvnt){


    var intEvnt = parseInt(idEvnt);
    db.events.put( { name: name, description: description, startDate: startDate, startTime: startTime, endDate: endDate, endTime: endTime, place: place, id:intEvnt } )
    .then(function() { 
      console.log('Note updated.'); 
    })
    .catch(function(err) { 
    });

    $("#placeForMessages").html("<div class='alert alert-success' role='alert'>Your event successfully saved!</div>");

  }else{

   
    db.events.add(
  { name: name, description: description, startDate: startDate, startTime:startTime, endDate: endDate, endTime:endTime, place: place}
  ).then(function() {
  $("#placeForMessages").html("<div class='alert alert-success' role='alert'>Your event successfully added!</div>");
  })
  .then(refreshView)
  .catch(function(err) {
  });

  clrAllInputs();
  }

  

}

function clrAllInputs(e){
  $("#name").val('');
  $("#description").val('');
  $("#startDate").val('');
  $("#startTime").val('');
  $("#endDate").val('');
  $("#endTime").val('');
  $("#place").val('');
  $("#for-date").text('');
  $("#placeForMessages").text('');



}



  function dltEvent(e) {
    e.preventDefault();
    var id = e.target.getAttribute('id');
    var intID = parseInt(id);
    db.events.delete(intID).then(refreshView);

  }


  function updEvent(e){

    e.preventDefault();
    var id = e.target.getAttribute('id');
    var intID = parseInt(id);

  db.events.get(intID).then(function(event) { 
  $("#name").val(event.name);
  $("#description").val(event.description);
  $("#startDate").val(event.startDate);
  $("#startTime").val(event.startTime);
  $("#endDate").val(event.endDate);
  $("#endTime").val(event.endTime);
  $("#place").val(event.place);
 
  
  var eventID = event.id;
 
  $("#for-date").html("<label class='col-sm-2 control-label'>#:</label> " + "<div class='col-sm-10' style='height:34px; text-align:left; padding-top: 7px;' id='idEvnt'>" + eventID + "</div>");
  $("#placeForMessages").html("<div class='alert alert-success' role='alert'>Now you can edit this event!</div>");
    console.log(event);
     }); 

   



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
    return '<tr><td>'+event.id +'</td><td>'+event.name+'</td><td>'+event.description+'</td><td><div class="btn-group" role="group"><button class="btn btn-default dltBtn" id="'+event.id+'">delete</button><button class="btn btn-default updBtn" id="'+event.id+'">update</button></div></td></tr>';
  }
// }());
});