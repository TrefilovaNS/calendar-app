function idbOK() {
return "indexedDB" in window;
}


$(document).ready(function() {

if(!idbOK()){
  console.log("Not suported IndexedDB")
}
$("#addEvent").on("click", addEvent);
$(document.body).on('click', '.dltBtn', dltEvent); 



var db = new Dexie("dexie1");
db.version(1).stores({
events:"_id,name,description,created"
});
db.open();
console.dir(db);

function addEvent(e){
  var name = $("#name").val();
  var description = $("#description").val();


  db.events.add(
  { _id: String(Date.now()), name: name, description: description, created:new Date().getTime() }
  ).then(function() {
  name.value = '';
  description.value = '';
  console.log('Note added.');
  })
  .then(refreshView)
  .catch(function(err) {
  });

}




  // var db = new Dexie("todos-dexie");
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
      .then(renderAllTodos);
       
  }

  function renderAllTodos(events) {
    var html = '';
    events.forEach(function(event) {
      html += todoToHtml(event);
    });
    $("#list").html(html);
    
    console.log('In render');
  }

  function todoToHtml(event) {
    return '<li><button class="dltBtn" ide="'+event._id+'">delete</button>'+event.name+'</li>';
  }
// }());
});