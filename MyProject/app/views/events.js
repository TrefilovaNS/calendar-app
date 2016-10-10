function idbOK() {
return "indexedDB" in window;
}


$(document).ready(function() {

if(!idbOK()){
  return console.log("Not suported IndexedDB")
}
$("#addEvent").on("click", addEvent);
$(document.body).on('click', '.dltBtn', dltEvent); 

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
events:"_id,name,description,startDate,endDate,place,created"
});
db.open();
console.dir(db);

function addEvent(e){
  var name = $("#name").val();
  var description = $("#description").val();
  var startDate = $("#startDate").val();
  var endDate = $("#endDate").val();
  var place = $("#place").val();


  db.events.add(
  { _id: String(Date.now()), name: name, description: description, startDate: startDate, endDate: endDate, place: place, created:new Date().getTime() }
  ).then(function() {
  name.value = '';
  description.value = '';
  console.log('Note added.');
  })
  .then(refreshView)
  .catch(function(err) {
  });

}




  // var db = new Dexie("Events-dexie");
  // var input = document.querySelector('input');
  // var ul = document.querySelector('ul');
  // document.addEventListener('submit', onSubmit);
  // document.addEventListener('click', onClick);

  // db.version(1).stores({ todo: '_id' })
  // db.open()
  //   .then(refreshView);

  function dltEvent(e) {
    e.preventDefault();
    if (e.target.hasAttribute('ide')) {
      db.events.where('_id').equals(e.target.getAttribute('ide')).delete()
        .then(refreshView);
    }
  }

  // function onSubmit(e) {
  //   e.preventDefault();
  //   db.todo.put({ text: input.value, _id: String(Date.now()) })
  //     .then(function() {
  //       input.value = '';
  //     })
  //     .then(refreshView);
  // }

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