'use strict';

var app = angular.module('calendarApp', ['DayView', 'MonthView', 'WeekView']);

app.controller('TabController', function($scope){
    this.tab = 1;

    this.setTab = function(newValue){
      this.tab = newValue;
    };

    this.isSet = function(tabName){
      return this.tab === tabName;
    };

   $scope.events = [
    {foo: 'bar', date: "2016-09-30 13:40", name:"Event Two", description:'Coming soon!', duration:'3 hours'}, //value of eventClass will be added to CSS class of the day element
    {foo: 'bar', date: "2016-09-30 21:07", name:"Event One", description:'Challenge!', duration:'2 hours'}
  ];
  	

  });
