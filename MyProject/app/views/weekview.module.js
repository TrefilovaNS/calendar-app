'use strict';

var app = angular.module('WeekView', [

]);

app.controller('WeekController', function WeekController($scope) {
		
		$scope.options = $scope.options || {};
		$scope.options.defaultDate = new Date();
		
		$scope.nextWeek = nextWeek;
		

var MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

		
		
	$scope.$watch('options.defaultDate', function() {
      calculateSelectedDate();
    });
function calculateSelectedDate() {
     
      $scope.selectedYear  = $scope.options.defaultDate.getFullYear();
      $scope.selectedMonth = MONTHS[$scope.options.defaultDate.getMonth()];
      $scope.selectedDay   = $scope.options.defaultDate.getDate();
      $scope.selectedHour   = $scope.options.defaultDate.getHours();
      $scope.selectedStartWeek = moment($scope.options.defaultDate).startOf('week').toDate();
	  $scope.selectedEndWeek = moment($scope.options.defaultDate).endOf('week').toDate();

	  $scope.nameStartWeek = MONTHS[$scope.selectedStartWeek.getMonth()];
	$scope.nameEndWeek = MONTHS[$scope.selectedEndWeek.getMonth()];

      // $scope.selectedTime   = $scope.options.defaultDate.getTime();


    }
	function nextWeek(){
 		
    	//var daysInCurrentMonth = new Date($scope.selectedYear, MONTHS.indexOf($scope.selectedMonth) + 1, 0).getDate();
 		var currIndex = MONTHS.indexOf($scope.selectedMonth);
 		
 		
 		var month = currIndex; 
		var lastDate = new Date($scope.selectedYear, month + 1, 0);
		var lastDay = lastDate.getDate();
		
		if(lastDay == $scope.selectedDay){
			if (currIndex === 11) {
        			$scope.selectedYear += 1;
        			$scope.selectedMonth = MONTHS[0];
      			} else {
        			$scope.selectedMonth = MONTHS[currIndex + 1];
        			$scope.selectedDay = 1;
      			}
		}else{
			$scope.selectedDay += 7;
		}
 		

 		var newDate = new Date($scope.selectedYear,$scope.options.defaultDate.getMonth(),$scope.selectedDay,0);
 		$scope.selectedStartWeek = moment(newDate).startOf('week').toDate();
	  	$scope.selectedEndWeek = moment(newDate).endOf('week').toDate();

	  	$scope.nameStartWeek = MONTHS[newDate.getMonth()];
		$scope.nameEndWeek = MONTHS[newDate.getMonth()];

	  	console.log($scope.selectedStartWeek,$scope.selectedEndWeek);

 		}


});