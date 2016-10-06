(function() {

var db = new Dexie("dexie1");
db.version(1).stores({
notes:"++id,text,created"
});
db.open();
console.dir(db);

db.notes.add(
{ text:'foo', created:new Date().getTime() }
).then(function() {
console.log('Note added.');
}).catch(function(err) {
});

  // var db = new Dexie("todos-dexie");
  // var input = document.getElementById('in');
  // var ul = document.querySelector('ul');
  // document.addEventListener('submit', onSubmit);
  // document.addEventListener('click', onClick);

  // db.version(1).stores({ todo: '_id' })
  // db.open()
  //   .then(refreshView);

  // function onClick(e) {
  //   e.preventDefault();
  //   if (e.target.hasAttribute('id')) {
  //     db.todo.where('_id').equals(e.target.getAttribute('id')).delete()
  //       .then(refreshView);
  //   }
  // }

  // function onSubmit(e) {
  //   e.preventDefault();
  //   db.todo.put({ text: input.value, _id: String(Date.now()) })
  //     .then(function() {
  //       input.value = '';
  //     })
  //     .then(refreshView);
  // }

  // function refreshView() {
  //   return db.todo.toArray()
  //     .then(renderAllTodos);
  // }

  // function renderAllTodos(todos) {
  //   var html = '';
  //   todos.forEach(function(todo) {
  //     html += todoToHtml(todo);
  //   });
  //   ul.innerHTML = html;
  // }

  // function todoToHtml(todo) {
  //   return '<li><button id="'+todo._id+'">delete</button>'+todo.text+'</li>';
  // }
}());