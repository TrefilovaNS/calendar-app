'use strict';

var app = angular.module('DayView', [

]);

app.controller('DayController', function DayController($scope) {


	$scope.times = getTimes();
	$scope.events = $scope.events || [];
	$scope.options = $scope.options || {};
	$scope.onClick = onClick;
    $scope.options.defaultDate = new Date();
    
    $scope.resetToToday = resetToToday;
    $scope.nextDay = nextDay;
    $scope.event = "Hi";
    


var MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];


$scope.$watch('options.defaultDate', function() {
      calculateSelectedDate();
    });

function calculateSelectedDate() {
     
      $scope.selectedYear  = $scope.options.defaultDate.getFullYear();
      $scope.selectedMonth = MONTHS[$scope.options.defaultDate.getMonth()];
      $scope.selectedDay   = $scope.options.defaultDate.getDate();
    }

 function getTimes(){
 	var times = [];
	var nulls = ":00";
	for(var i = 0; i<24; i++){
		times.push(i);
		times[i] = i + nulls;
	}
	return times;
 }
 	function onClick(){

 	}

 	function resetToToday(){
 		$scope.options.defaultDate = new Date();
      	$scope.selectedYear  = $scope.options.defaultDate.getFullYear();
      	$scope.selectedMonth = MONTHS[$scope.options.defaultDate.getMonth()];
      	$scope.selectedDay   = $scope.options.defaultDate.getDate();
 	}

 	function nextDay(){
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
			$scope.selectedDay += 1;
		}
      
 	}

 	$scope.$watch('selectedDay', function() {
      calculateTimes();
    });
 		/////////////// // // 
  //   function cTime(time) {
      	
  //     	var currTime = date.time;
  //     	return true;
  //   }


 	// function calculateTimes(){
 	// 	var date = $scope.options.defaultDate;
 	// 	var times = $scope.times;
 	// 	var currDate = cDate(date).get
 	// 	var getTimes = date.getTimes();
 	// 	var format = getTimes.customFormat( "#DD#/#MM#/#YYYY# #hh#:#mm#:#ss#" )
 	// 	console.log(getTimes);

 	// 	for(var i = 0; i<times.length; i++ ){

 	// 	}

 		/////////////// // // 
//  		var now = new Date;
// console.log( now.customFormat( "#DD#/#MM#/#YYYY# #hh#:#mm#:#ss#" ) );
		

 	// }

//  	function calculateWeeks() {
//       $scope.weeks = [];
//       var week = null;
//       var daysInCurrentMonth = new Date($scope.selectedYear, MONTHS.indexOf($scope.selectedMonth) + 1, 0).getDate();

//       for (var day = 1; day < daysInCurrentMonth + 1; day += 1) {
//         var date = new Date($scope.selectedYear, MONTHS.indexOf($scope.selectedMonth), day);
//         var dayNumber = new Date($scope.selectedYear, MONTHS.indexOf($scope.selectedMonth), day).getDay();
//         dayNumber = (dayNumber + 6) % 7;
//         week = week || [null, null, null, null, null, null, null];
//         week[dayNumber] = {
//           year: $scope.selectedYear,
//           month: MONTHS.indexOf($scope.selectedMonth),
//           day: day,
//           date: date,
//           _month : date.getMonth() + 1
//         };
// //week.disabled?
//         if (cDate(week[dayNumber])) {
//           if ($scope.mappedEvents) { bindEvent(week[dayNumber]); }
//         } else {
//           week[dayNumber].disabled = true;
//         }


//         if (dayNumber === 6 || day === daysInCurrentMonth) {
//           $scope.weeks.push(week);
//           week = undefined;
//         }
//       }
      
//     }



    ///////
//     var MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
//     var WEEKDAYS = ['MONDAY' , 'TUESDAY' , 'WEDNESDAY' , 'THURSDAY' , 'FRIDAY' , 'SATURDAY', 'SUNDAY'];

// 	if($scope.events)
//     {
//       createMappedEvents();
//     }

//     function createMappedEvents(){
//       $scope.mappedEvents = $scope.events.map(function(obj)
//       {
//         obj.date = new Date(obj.date);
//         return obj;
//       });
//     }

//     function registerEvents(){
      
//       $scope.$on(resetToToday);
//       $scope.$on(nextMonth);
//     }

//     $scope.$watch('options.defaultDate', function() {
//       calculateSelectedDate();
//     });

//   	$scope.$watch('events', function() {
//       createMappedEvents();
//       calculateWeeks();
//     });

//     $scope.$watch('weeks', function(weeks) {
//       var filteredEvents = [];
//       angular.forEach(weeks, function(week) {
//         angular.forEach(week, function (day){
//           if(day && day.event){
//             angular.forEach(day.event, function(event) {
//               filteredEvents.push(event);
//             });
//           }
//         });
//       });
//       if('function' === typeof $scope.options.filteredEventsChange){
//         $scope.options.filteredEventsChange(filteredEvents);
//       }
//     });

//     $scope.$watch('selectedYear', function(year, previousYear) {
//       if(year !== previousYear) calculateWeeks();
//     });
//     $scope.$watch('selectedMonth', function(month, previousMonth) {
//       if(month !== previousMonth) calculateWeeks();
//     });

//     function onClick(date, index, domEvent) {
//       if (!date) { return; }
//       $scope.options.defaultDate = date.date;
//       if (date.event.length && $scope.options.eventClick) {
//         $scope.options.eventClick(date, domEvent);
//       }
      
//     }

//     function bindEvent(date) {
//       if (!date || !$scope.mappedEvents) { return; }
//       date.event = [];
//       $scope.mappedEvents.forEach(function(event) {
//         if (date.date.getFullYear() === event.date.getFullYear()
//             && date.date.getMonth() === event.date.getMonth()
//             && date.date.getDate() === event.date.getDate()) {
//           date.event.push(event);
//         }
//       });
//     }

//      function cDate(date) {
//       	var currDate = date.date;
//       	return true;
//     }

//     function calculateWeeks() {
//       $scope.weeks = [];
//       var week = null;
//       var daysInCurrentMonth = new Date($scope.selectedYear, MONTHS.indexOf($scope.selectedMonth) + 1, 0).getDate();

//       for (var day = 1; day < daysInCurrentMonth + 1; day += 1) {
//         var date = new Date($scope.selectedYear, MONTHS.indexOf($scope.selectedMonth), day);
//         var dayNumber = new Date($scope.selectedYear, MONTHS.indexOf($scope.selectedMonth), day).getDay();
//         dayNumber = (dayNumber + 6) % 7;
//         week = week || [null, null, null, null, null, null, null];
//         week[dayNumber] = {
//           year: $scope.selectedYear,
//           month: MONTHS.indexOf($scope.selectedMonth),
//           day: day,
//           date: date,
//           _month : date.getMonth() + 1
//         };
// //week.disabled?
//         if (cDate(week[dayNumber])) {
//           if ($scope.mappedEvents) { bindEvent(week[dayNumber]); }
//         } else {
//           week[dayNumber].disabled = true;
//         }


//         if (dayNumber === 6 || day === daysInCurrentMonth) {
//           $scope.weeks.push(week);
//           week = undefined;
//         }
//       }
      
//     }

//     function calculateSelectedDate() {
//       if ($scope.options.defaultDate) {
//         $scope.options._defaultDate = new Date($scope.options.defaultDate);
//       } else {
//         $scope.options._defaultDate = new Date();
//       }

//       $scope.selectedYear  = $scope.options._defaultDate.getFullYear();
//       $scope.selectedMonth = MONTHS[$scope.options._defaultDate.getMonth()];
//       $scope.selectedDay   = $scope.options._defaultDate.getDate();
//     }

//     function weekDays() {
//       return WEEKDAYS.map(function(name) { return name.slice(0, 3); });
//     }

//     function isDefaultDate(date) {
//       if (!date) { return; }
//       var result = date.year === $scope.options._defaultDate.getFullYear() &&
//         date.month === $scope.options._defaultDate.getMonth() &&
//         date.day === $scope.options._defaultDate.getDate();
//       return result;
//     }

//     function resetToToday() {
//     	$scope.options._defaultDate = new Date();
//       	$scope.selectedYear  = $scope.options._defaultDate.getFullYear();
//       	$scope.selectedMonth = MONTHS[$scope.options._defaultDate.getMonth()];
//       	$scope.selectedDay   = $scope.options._defaultDate.getDate();
//     }

// 	function nextMonth() {
//       var currIndex = MONTHS.indexOf($scope.selectedMonth);
//       if (currIndex === 11) {
//         $scope.selectedYear += 1;
//         $scope.selectedMonth = MONTHS[0];
//       } else {
//         $scope.selectedMonth = MONTHS[currIndex + 1];
//       }
      
//     }


 
 
});