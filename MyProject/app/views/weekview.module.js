'use strict';

var app = angular.module('WeekView', [

]);

app.controller('WeekController', function WeekController($scope) {
	
		$scope.selectedStartWeek = moment().startOf('week').toDate();
		$scope.selectedEndWeek = moment().endOf('week').toDate();
		$scope.nextWeek = nextWeek;
		// $scope.options.defaultDate = new Date();

var MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

		$scope.nameStartWeek = MONTHS[$scope.selectedStartWeek.getMonth()];
		$scope.nameEndWeek = MONTHS[$scope.selectedEndWeek.getMonth()];
		
function nextWeek(){
 		
      
 	}
	// $scope.$watch('options.defaultDate', function() {
 //      calculateSelectedDate();
 //    });


// function calculateSelectedDate() {
     
//       $scope.selectedYear  = $scope.options.defaultDate.getFullYear();
//       $scope.selectedMonth = MONTHS[$scope.options.defaultDate.getMonth()];
//       $scope.selectedDay   = $scope.options.defaultDate.getDate();
//       $scope.selectedHour   = $scope.options.defaultDate.getHours();

//       // $scope.selectedTime   = $scope.options.defaultDate.getTime();


//     }
	
});