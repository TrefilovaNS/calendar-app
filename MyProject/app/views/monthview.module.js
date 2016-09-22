'use strict';

var app = angular.module('MonthView', [

]);

app.controller('MonthController', function MonthController($scope) {
	var days = [];
	
	//отобразить все дни месяца
	var d = new Date();
	var month = d.getMonth() + 1;
	 
	function daysInMonth(month,year) {		
    	return new Date(year, month, 0).getDate();
	}

	var numbDays = daysInMonth(month,2009);
	
	for(var i = 0; i<=numbDays; i++){
		days.push(i);
		days[i] = i;
	}

	var daysForView = [];
    for (var i = 0; i < days.length; i++ ) {
        if (i % 7 == 0) daysForView.push([]);
        daysForView[daysForView.length-1].push(days[i]);
    }
	
	 
 
  $scope.days = daysForView;
});