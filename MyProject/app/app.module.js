'use strict';

var app = angular.module('calendarApp', ['ngRoute','ngDexieBind','DayView', 'MonthView', 'WeekView','YearView']);
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
  .otherwise('/views');
});

// app.factory('Factory', function() {

//   $dexieBind.bind(db, db.events, $scope);

  // // private variable
  // var date = new Date();
  // // var yearDate = 
  // var _dataObj = {
  //   data: date.getFullYear()
  // }

  // function getYear (){
  //   return _dataObj.yearDate;
  // }
  // return {
    
   
  //   getYear: getYear
  // };
  // });
app.controller('TabController', function($scope){
    this.tab = 1;

    this.setTab = function(newValue){
      this.tab = newValue;
    };

    this.isSet = function(tabName){
      return this.tab === tabName;
    };


  });

app.controller('MainController', function($scope, $dexieBind){
   
  
  console.log($dexieBind);

   $scope.events = [
    {foo: 'bar', date: "2016-10-03 13:40", name:"Event Two", description:'Coming soon!', duration:'3 hours'}, //value of eventClass will be added to CSS class of the day element
    {foo: 'bar', date: "2016-09-30 21:07", name:"Event One", description:'Challenge!', duration:'2 hours'},
    {foo: 'bar', date: "2016-10-05 21:07", name:"Event One", description:'Challenge!', duration:'2 hours'}
  ];
  	
   $scope.OnEvents = OnEvents;
   $scope.OffEvents = OffEvents;

 function OnEvents(){
    console.log("hello!");
  }
  function OffEvents(){
    setTimeout(function () {
        $scope.$apply(function () {
            $scope.events = [];
            console.log($scope.events);
        });
    }, 1000);
    
  }



  });
