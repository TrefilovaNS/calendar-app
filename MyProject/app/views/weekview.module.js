'use strict';

var app = angular.module('WeekView', [

]);

app.controller('WeekController', function WeekController($scope) {
		
		$scope.options = $scope.options || {};
		$scope.options.defaultDate = new Date();
		
		$scope.nextWeek = nextWeek;
		$scope.resetToToday = resetToToday;
		$scope.weekDays = weekDays;
		

var MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
var WEEKDAYS = ['','MONDAY' , 'TUESDAY' , 'WEDNESDAY' , 'THURSDAY' , 'FRIDAY' , 'SATURDAY', 'SUNDAY'];

		
		
	$scope.$watch('options.defaultDate', function() {
      calculateSelectedDate();
    });

	$scope.$watch('selectedStartWeek' && 'selectedEndWeek', function() {
      calculateDaysOfWeek();
    });

function calculateSelectedDate() {
     
      $scope.selectedYear  = $scope.options.defaultDate.getFullYear();
      $scope.selectedMonth = MONTHS[$scope.options.defaultDate.getMonth()];
      $scope.selectedDay   = $scope.options.defaultDate.getDate();
      $scope.selectedHour   = $scope.options.defaultDate.getHours();
      $scope.selectedStartWeek = moment($scope.options.defaultDate).startOf('isoweek').toDate();
	  $scope.selectedEndWeek = moment($scope.options.defaultDate).endOf('isoweek').toDate();

	  $scope.nameStartWeek = MONTHS[$scope.selectedStartWeek.getMonth()].slice(0, 3);
	  $scope.nameEndWeek = MONTHS[$scope.selectedEndWeek.getMonth()].slice(0, 3);

      // $scope.selectedTime   = $scope.options.defaultDate.getTime();


    }
     function weekDays() {
      return WEEKDAYS.map(function(name) { return name.slice(0, 3); });
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
 		$scope.selectedStartWeek = moment(newDate).startOf('isoweek').toDate();
	  	$scope.selectedEndWeek = moment(newDate).endOf('isoweek').toDate();

	  	$scope.nameStartWeek = MONTHS[$scope.selectedStartWeek.getMonth()].slice(0, 3);
		$scope.nameEndWeek = MONTHS[$scope.selectedEndWeek.getMonth()].slice(0, 3);

	  	console.log($scope.selectedStartWeek,$scope.selectedEndWeek);

 		}
 	function resetToToday(){
 	    $scope.options.defaultDate = new Date();
      	$scope.selectedYear  = $scope.options.defaultDate.getFullYear();
      	$scope.selectedMonth = MONTHS[$scope.options.defaultDate.getMonth()];
      	$scope.selectedDay   = $scope.options.defaultDate.getDate();
        $scope.selectedHour   = $scope.options.defaultDate.getHours();
 	}

 	function calculateDaysOfWeek(){
      	var daysOfWeek = [];
      	var startWeek = $scope.selectedStartWeek;
		var endWeek = $scope.selectedEndWeek;

		for(var i = 1; i<8;i++){
			var weekday = moment(startWeek).weekday(i).toDate();
			var date = new Date(weekday.getFullYear(),weekday.getMonth(),weekday.getDate(),0)
			//daysOfWeek.push(weekday)
         
			daysOfWeek[i-1] = {
            year: weekday.getFullYear(),
            month: MONTHS[weekday.getMonth()],
            day: weekday.getDate(),
            date: date,
            _month : weekday.getMonth() + 1
            };
		}
 		$scope.daysOfWeek = daysOfWeek;

      }

});