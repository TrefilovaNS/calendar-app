'use strict';

var app = angular.module('DayView', [

]);

app.controller('DayController', function DayController($scope) {
	var times = [];
	var nulls = ":00";
	for(var i = 0; i<24; i++){
		times.push(i);
		times[i] = i + nulls;
	}
	
	 
 
  $scope.times = times;
});