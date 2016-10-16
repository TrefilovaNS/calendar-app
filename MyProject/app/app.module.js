'use strict';

var app = angular.module('calendarApp', ['ngRoute','DayView', 'MonthView', 'WeekView','YearView']);
angular.module('calendarApp').constant('dexie', window.Dexie);

app.config(function($routeProvider) {
  $routeProvider
  // .when("/", {
  //   templateUrl : "index.html"
  // })
   .when("/views", {
    templateUrl : "main-views/views.html"
  })
  .when("/events", {
    templateUrl : "main-views/eventsview.html"
  })
  .otherwise('/events');
});

// app.service('$',function(){return $;});

app.factory('DBFactory', function($rootScope) {


function idbOK() {
return "indexedDB" in window;
}

if(!idbOK()){
  return console.log("Not suported IndexedDB")
}

var db = new Dexie("dexie1");
db.version(1).stores({
events:"++id,name,description,startDate,endDate,place"
});
db.open();

   //Operations with DB here (events.js file in past)
      $(function () {
        window.onload = function () {
        var url="http://localhost:8000/#/events";
        $(window).on('hashchange', function(e){
        if(location.href==url){

          window.location.reload();

    }
});


    if (! localStorage.justOnce) {
        localStorage.setItem("justOnce", "true");
        window.location.reload();
    }
}
window.onload();

refreshView();


$("#placeForMessages").html("<div class='alert alert-warning' role='alert'>Welcome to Calendar App! Now you can add some events to this application!</div>");

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
    refreshView();
    $rootScope.$broadcast('valueChanged', getAllData());
    $("#placeForMessages").html("<div class='alert alert-success' role='alert'>Your event successfully saved!</div>");

  }else{

   
    db.events.add(
  { name: name, description: description, startDate: startDate, startTime:startTime, endDate: endDate, endTime:endTime, place: place}
  ).then(function() {
  $("#placeForMessages").html("<div class='alert alert-success' role='alert'>Your event successfully added! See your events in <a href='#views'>Calendar</a></div>");
  })
  .then(refreshView)
  .catch(function(err) {
  });

  clrAllInputs();
   $rootScope.$broadcast('valueChanged', getAllData());
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
    $rootScope.$broadcast('valueChanged', getAllData());

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
  $("#placeForMessages").html("<div class='alert alert-warning' role='alert'>Now you can edit this event!</div>");
    console.log(event);
     }); 

   window.scrollTo(0, 0);



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

   $('#toggle-event').change(function() {
    var status = $(this).prop('checked');
      if(status === true){
        document.styleSheets[0].addRule('.flex-calendar .days .day.event:before','display: inline;');
        document.styleSheets[0].addRule('.flex-calendar .days .day:not(.disabled):not(.out)','cursor: pointer; pointer-events: visible;');
        document.styleSheets[0].addRule('.time.eventTime .right','display: inline;');
        document.styleSheets[0].addRule('.v-right.week .day.color div div span:nth-child(2n)','display: inline;');
      }else{
        document.styleSheets[0].addRule('.flex-calendar .days .day.event:before','display: none;');
        document.styleSheets[0].addRule('.flex-calendar .days .day:not(.disabled):not(.out)','cursor: default; pointer-events: none;');
        document.styleSheets[0].addRule('.time.eventTime .right','display: none;');
        document.styleSheets[0].addRule('.v-right.week .day.color div div span:nth-child(2n)','display: none;');

      }

           
    });


  
  });

function getAllData(){
       var allData = [];
      db.events.each(function(event){
        var obj = {};
      obj.name = event.name;
      obj.description = event.description;
      obj.place = event.place;
      var startDate = event.startDate + ' ' + event.startTime;
      obj.date = startDate;
      var endDate = event.endDate + ' ' + event.endTime;
      obj.duration = moment.utc(moment(endDate,"YYYY-MM-DD HH:mm").diff(moment(startDate,"YYYY-MM-DD HH:mm"))).format("HH:mm")


      allData.push(obj);
   });
      return allData;
  }
     return {
       
    getAllData: getAllData
  };

   
  });

app.controller('TabController', function($scope){
    this.tab = 1;

    this.setTab = function(newValue){
      this.tab = newValue;
    };

    this.isSet = function(tabName){
      return this.tab === tabName;
    };


  });

app.controller('MainController', function($scope, DBFactory){


        $scope.$on('valueChanged', function (evt, getdata) {       
        $scope.$apply(function() {
            $scope.data = getdata;
            $scope.events = $scope.data;
            $scope.$broadcast('events');
        });
    });

    $scope.data = DBFactory.getAllData();
    $scope.events = $scope.data;


  
  //   $scope.events = [
  //     {foo: 'bar', date: "2016-10-03 13:40", name:"Event Two", description:'Coming soon!', duration:'3 hours'}, //value of eventClass will be added to CSS class of the day element
  //     {foo: 'bar', date: "2016-09-30 21:07", name:"Event One", description:'Challenge!', duration:'2 hours'},
  //     {foo: 'bar', date: "2016-10-15 21:07", name:"Event One", description:'Challenge!', duration:'2 hours'}
  // ];
 

  });

app.controller('NotifyController', function($scope, $timeout){

   
    
    $(function () {
      
      //For first init
       $scope.$watch('events', function() {
        if($('#toggle-notify').prop('checked') === true){
             checkToday();
              checkTomorrow();
         }
              
            });
         


          // $('#toggle-notify').change(function() {
          //   var status = $('#toggle-notify').prop('checked');
          //   if(status === true){
          //     $scope.$watch('events', function() {
          //     checkToday();
          //     checkTomorrow();
          //   });
          //   }
          // });

        });
      // $('#toggle-notify').change(function() {
      // var status = $(this).prop('checked');
      //   if(status === true){
      //     console.log("Notify On");
         
    
      //   }else{
      //     console.log("Notify Off");

      //   }
      // });

   
   //Set notifications
   function notifyOn(name, description, date, place){

   if (!("Notification" in window)) {
    console.log("This browser does not support desktop notification");
  }
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var date = new Date(date);
     var options = {
      body: description + ' at ' + moment(date).format('HH:mm') + ' in ' + place,
      icon: 'img/calendar.png',
  }
    var notification = new Notification(name,options);
    setTimeout(notification.close.bind(notification), 4000); 
   }else{
    console.log('Cant create notification');
   }

 };
       
  
  

       //Проверка на сегодняшний день
      function checkToday(){
        $timeout(function() {
         var currentFullDate = new Date();
         var currentYear = currentFullDate.getFullYear();
         var currentMonth = currentFullDate.getMonth() + 1;
         var currentDay = currentFullDate.getDate();
         var currentHour = currentFullDate.getHours();
         var currentMinutes = currentFullDate.getMinutes();
         
         var events = $scope.events;
         var result = events.map(function(a) {
          
          var date = new Date(a.date);
          var dYear = date.getFullYear();
          var dMonth = date.getMonth() + 1;
          var dDay = date.getDate();
          var dHour = date.getHours();
          var dMinutes = date.getMinutes();

          if(dYear == currentYear 
            && currentMonth == dMonth 
            && currentDay == dDay){
              if(!(currentHour < dHour)){
                if(currentHour == dHour && currentMinutes > dMinutes){}
              }else{
              var name = "Today " + a.name;
              notifyOn(name, a.description, a.date, a.place);
              }
            
          }
          
        });
       
        }, 1000);
      }
       //Для завтрашнего события
       function checkTomorrow(){
        $timeout(function() {
          var date  = moment(new Date()).add(1,'days');
          var tomorrow = date._d;
          tomorrow.setHours(0,0,0);
          
         var tomYear = tomorrow.getFullYear();
         var tomMonth = tomorrow.getMonth() + 1;
         var tomDay = tomorrow.getDate();
         var tomHour = tomorrow.getHours();
         
         
         var events = $scope.events;
         var result = events.map(function(a) {
          
          var date = new Date(a.date);
          var dYear = date.getFullYear();
          var dMonth = date.getMonth() + 1;
          var dDay = date.getDate();
          var dHour = date.getHours();
          
          if(dYear == tomYear 
            && tomMonth == dMonth 
            && tomDay == dDay){
            var name = "Tomorrow " + a.name;
             notifyOn(name, a.description, a.date, a.place);
          }
          
        });
       
        }, 1000);
       }
      
       


  });
