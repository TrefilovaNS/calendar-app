'use strict';

var app = angular.module('calendarApp', ['ngRoute','DayView', 'MonthView', 'WeekView','YearView']);
angular.module('calendarApp').constant('dexie', window.Dexie);

app.config(function($routeProvider) {
  $routeProvider
  .when("/views", {
    templateUrl : "main-views/views.html"
  })
  .when("/events", {
    templateUrl : "main-views/eventsview.html"
  })
  .otherwise('/events');
});
app.factory('DBFactory', function($rootScope) {


  function idbOK() {
    return "indexedDB" in window;
  }

  if(!idbOK()){
    return alert("Not suported IndexedDB")
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

      $(document.body).on('click', '#addEvent', addEvent);
      $(document.body).on('click', '#deleteAll', deleteAll);
      $(document.body).on('click', '#clrAllInputs', clrAllInputs);
      $(document.body).on('click', '.dltBtn', dltEvent); 
      $(document.body).on('click', '.updBtn', updEvent); 

    }
    window.onload();

    refreshView();



  });


   function start(){
    $("#placeForMessages").html("<div class='alert alert-warning' role='alert'>Welcome to Calendar App! Now you can add some events to this application!</div>");

    $('#datePicker .time').timepicker({
      'showDuration': true,
      'timeFormat': 'H:i',
    });

    $('#datePicker .date').datepicker({
      'format': 'yyyy-mm-dd',
      'autoclose': true
    });

    $('#datePicker').datepair();
    //Toggle button

    $('#toggle-event').bootstrapToggle();
    $('#toggle-notify').bootstrapToggle();


    $('#toggle-event').change(function() {

        //For css rules
        var customCSSRule = function(style, element, property, value){
         if("addRule" in style) {
          style.addRule(element, property + ": " + value);
        } else if("insertRule" in style) {

          var element = element;
          var property = property;
          var value = value;
          if(element === ".flex-calendar .days .day.event:before"){
            $('.flex-calendar .days .day.event').addClass('display');
            if(value === "none") {
            //$('.flex-calendar .days .day.event').addClass('hidden');
            $('.flex-calendar .days .day.event').removeClass('display');
            style.insertRule(element + "{" + property + ":" + value + "}",0);
          }
        }else{
          $(element).css(property, value);  
        }

      }
    }

    var status = $(this).prop('checked');
    if(status === true){
      customCSSRule(document.styleSheets[0], ".flex-calendar .days .day.event:before", "display","inline");
      customCSSRule(document.styleSheets[0], ".flex-calendar .days .day.event", "cursor","pointer");
      customCSSRule(document.styleSheets[0], ".flex-calendar .days .day.event", "pointer-events","visible");
      customCSSRule(document.styleSheets[0], ".time.eventTime .right", "display","inline");
      //customCSSRule(document.styleSheets[0], ".time.eventTime .right", "pointer-events","visible");
      customCSSRule(document.styleSheets[0], ".v-right.week .day.color div div span:nth-child(2n)", "display","inline");
      //customCSSRule(document.styleSheets[0], ".v-right.week .day.color div div span:nth-child(2n)", "pointer-events","visible");

    }else{
      customCSSRule(document.styleSheets[0], ".flex-calendar .days .day.event:before", "display","none");
      customCSSRule(document.styleSheets[0], ".flex-calendar .days .day.event", "cursor","default");
      customCSSRule(document.styleSheets[0], ".flex-calendar .days .day.event", "pointer-events","none");
      customCSSRule(document.styleSheets[0], ".time.eventTime .right", "display","none");
      //customCSSRule(document.styleSheets[0], ".time.eventTime .right", "pointer-events","none");
      customCSSRule(document.styleSheets[0], ".v-right.week .day.color div div span:nth-child(2n)", "display","none");
      //customCSSRule(document.styleSheets[0], ".v-right.week .day.color div div span:nth-child(2n)", "pointer-events","none");
    }

  });


  }


  function addEvent(e){
  //Get values
  var name = $("#name").val();
  var description = $("#description").val();
  var startDate = $("#startDate").val();
  var startTime = $("#startTime").val();
  var endDate = $("#endDate").val();
  var endTime = $("#endTime").val();
  var place = $("#place").val();
  var idEvnt = $("#idEvnt").text();
  
  //If we have id of event
  if(idEvnt){

    //Update it
    var intEvnt = parseInt(idEvnt);
    db.events.put( { name: name, description: description, startDate: startDate, startTime: startTime, endDate: endDate, endTime: endTime, place: place, id:intEvnt } )
    .then(refreshView)
    .then(function() { 
      $rootScope.$broadcast('valueChanged');
      $("#placeForMessages").html("<div class='alert alert-success' role='alert'>Your event successfully saved!</div>");
    }).catch(function(err) { 
    })
  }else{
    //If not - create event

    db.events.add(
      { name: name, description: description, startDate: startDate, startTime:startTime, endDate: endDate, endTime:endTime, place: place}
      ).then(refreshView)
    .then(function() {
      $("#placeForMessages").html("<div class='alert alert-success' role='alert'>Your event successfully added! See your events in <a href='#views'>Calendar</a></div>");
    })      
    .catch(function(err) {
    });

    clrAllInputs();
    $rootScope.$broadcast('valueChanged');

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
  db.events.delete(intID).then(refreshView)
  .then(function(){
    $("#placeForMessages").html("<div class='alert alert-success' role='alert'>Your event successfully deleted</div>");

  });
  $rootScope.$broadcast('valueChanged');    

}

function deleteAll(e){

  db.events.clear().then(refreshView)
  .then(function(){
    $("#placeForMessages").html("<div class='alert alert-success' role='alert'>All event successfully deleted</div>");

  });

  $rootScope.$broadcast('valueChanged');   
}


function updEvent(e){

  e.preventDefault();
  var id = e.target.getAttribute('id');
  var intID = parseInt(id);
  //Now show clicked event to update it
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
  start();
}

function todoToHtml(event) {
  return '<tr><td>'+event.id +'</td><td>'+event.name+'</td><td>'+event.description+'</td><td><div class="btn-group" role="group"><button class="btn btn-default dltBtn" id="'+event.id+'">delete</button><button class="btn btn-default updBtn" id="'+event.id+'">update</button></div></td></tr>';
}

//Method to add holidays in DB
function addHolidaysToDB(holidays){

  var unformatHolidays = holidays;
  unformatHolidays.forEach(function(holiday) {
    return db.events.add(
      { name: holiday.englishName, 
        description: "Holiday", 
        startDate: holiday.date.year + "-" + holiday.date.month + "-" + holiday.date.day, 
        startTime: "00:00", 
        endDate: holiday.date.year + "-" + holiday.date.month + "-" + holiday.date.day, 
        endTime: "23:59", 
        place: ""}
        ).then(refreshView)
    .then(function() {
      $("#placeForMessages").html("<div class='alert alert-success' role='alert'>Your holidays successfully added! See your events in <a href='#views'>Calendar</a></div>");
      $rootScope.$broadcast('valueChanged');
    })      
    .catch(function(err) {
    });


  });
}
//Method to get all data from DB
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
  addHolidaysToDB: addHolidaysToDB,
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
//Get holidays from json
app.factory('Holidays', function($http) {

 function getHolidays(year) {

  var url="http://localhost:8000/holidays/holidays" + year + ".json"
  
  return $http({
    method: 'GET',
    url: url    
  }).success(function(data){
    return data;
  })
  .error(function(data, status, headers, config){
   console.log("Denied: " + status);
 });

};

return {

  getHolidays: getHolidays
};


});


app.controller('MainController', function($scope, DBFactory, Holidays, $http){
  //Main functions - get all data and send it to views
  $scope.$on('valueChanged', function() {       
    $scope.$apply(function() {
      addEvents();
      $scope.$broadcast('events');
    });
  });

  function addEvents(){
    $scope.data = DBFactory.getAllData();
    $scope.events = $scope.data;

  }
  addEvents();


    //Holidays

    $scope.holidaysClick = holidaysClick;
    $scope.yearsForHolidays = ['2016','2017','2018'];

    function holidaysClick(year){
      Holidays.getHolidays(year).then(function (holiday) {
        $scope.holidays = holiday.data;


        var unformatHolidays = $scope.holidays;

        DBFactory.addHolidaysToDB(unformatHolidays);


      });
    };



  });

app.controller('NotifyController', function($scope, $timeout){

  $(function () {
      //For first init and if events changes
      $scope.$watch('events', function() {
        if($('#toggle-notify').prop('checked') === true){
         checkToday();
         checkTomorrow();
       }

     });
       //For every true status - send notifications
       $('#toggle-notify').change(function() {
        var status = $('#toggle-notify').prop('checked');
        if(status === true){
          if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
          }else{
            checkToday();
            checkTomorrow();
          }
          

        }
      });

     });


   //Set notifications
   function notifyOn(name, description, date, place){

    Notification.requestPermission().then(function(result) {
      if (result === 'denied') {
        console.log('Permission wasn\'t granted. Allow a retry.');
        return;
      }
      if (result === 'default') {
        console.log('The permission request was dismissed.');
        return;
      }
    // If it's okay let's create a notification
    var eDate = new Date(date);
    var options = {
      body: description + ' at ' + moment(eDate).format('HH:mm') + ' in ' + place,
      icon: 'img/calendar.png',
    }
    var notification = new Notification(name,options);
    setTimeout(notification.close.bind(notification), 4000); 


  });

  };

    //Check for today 
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
  //Check for tomorrow
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