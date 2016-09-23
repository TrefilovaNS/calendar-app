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
	
	var months = new Array(12);
		months[1] = "January";
		months[2] = "February";
		months[3] = "March";
		months[4] = "April";
		months[5] = "May";
		months[6] = "June";
		months[7] = "July";
		months[8] = "August";
		months[9] = "September";
		months[10] = "October";
		months[11] = "November";
		months[12] = "December";
	 
	 var nameMouth = months[month];

 
  $scope.days = daysForView;
  $scope.name = nameMouth;
});