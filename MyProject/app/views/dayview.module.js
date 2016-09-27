'use strict';

var app = angular.module('DayView', [

]);

app.controller('DayController', function DayController($scope) {


  
	$scope.events = $scope.events || [];
	$scope.options = $scope.options || {};
	$scope.onClick = onClick;
  $scope.options.defaultDate = new Date();
  $scope.hoursOfDay = $scope.hoursOfDay || [];
  $scope.isDefaultDate = isDefaultDate;
  $scope.hoursForView = getHoursForView();
    
  $scope.resetToToday = resetToToday;
  $scope.nextDay = nextDay;
 
 


var MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

function getHoursForView(){
	var times = [];
	var nulls = ':00';
	for(var i = 0; i<24;i++){
		times.push(i+ nulls);
	}
	return times;
};

if($scope.events)
    {
      createMappedEvents();
    }

    function createMappedEvents(){
      $scope.mappedEvents = $scope.events.map(function(obj)
      {
        obj.date = new Date(obj.date);
        return obj;
      });
    }

    function registerEvents(){
      
      $scope.$on(resetToToday);
      $scope.$on(nextDay);
    }

$scope.$watch('options.defaultDate', function() {
      calculateSelectedDate();
    });

  $scope.$watch('events', function() {
      createMappedEvents();
      calculateTimes();
    });
function calculateSelectedDate() {
     
      $scope.selectedYear  = $scope.options.defaultDate.getFullYear();
      $scope.selectedMonth = MONTHS[$scope.options.defaultDate.getMonth()];
      $scope.selectedDay   = $scope.options.defaultDate.getDate();
      $scope.selectedHour   = $scope.options.defaultDate.getHours();
      $scope.selectedMinute   = $scope.options.defaultDate.getMinutes();
      $scope.selectedTime   = $scope.options.defaultDate.getTime();


    }



 	function resetToToday(){
 		    $scope.options.defaultDate = new Date();
      	$scope.selectedYear  = $scope.options.defaultDate.getFullYear();
      	$scope.selectedMonth = MONTHS[$scope.options.defaultDate.getMonth()];
      	$scope.selectedDay   = $scope.options.defaultDate.getDate();
        $scope.selectedHour   = $scope.options.defaultDate.getHours();
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

   function onClick(date, domEvent) {
      if (!date) { return; }
      // $scope.options.defaultDate = date.date;
      // if (date.event.length && $scope.options.eventClick) {
      //   $scope.options.eventClick(date, domEvent);
      // }
      console.log(date);
    }

  function bindEvent(date) {
      if (!date || !$scope.mappedEvents) { return; }
      date.event = [];
      $scope.mappedEvents.forEach(function(event) {
        if (date.date.getFullYear() === event.date.getFullYear()
            && date.date.getMonth() === event.date.getMonth()
            && date.date.getDate() === event.date.getDate()
            && date.date.getHours() === event.date.getHours()
            && date.date.getMinutes() === event.date.getMinutes()) {
          date.event.push(event);
        }
      });
    }

 	$scope.$watch('selectedDay', function() {
      calculateTimes();
    });
 		/////////////// // // 
  //   function cTime(time) {
      	
  //     	var currTime = date.time;
  //     	return true;
  //   }


 	function calculateTimes(){
      $scope.hoursOfDay = [];
      
      

    for (var i = 0; i<24; i++ ) {
    	for(var j = 0; j<60;j++){
    		var minute = j;
			var hour = i;
          var date = new Date($scope.selectedYear, MONTHS.indexOf($scope.selectedMonth), $scope.selectedDay, hour, minute);
          var hoursOfDay = date.getHours();
          var arrForTimes = [];
          arrForTimes[hoursOfDay] = {
            year: $scope.selectedYear,
            month: MONTHS.indexOf($scope.selectedMonth),
            day: $scope.selectedDay,
            date: date,
            hour: hour,
            minute: minute,
            _month : date.getMonth() + 1
            };
		if($scope.mappedEvents){
			bindEvent(arrForTimes[hoursOfDay]);
		}
          $scope.hoursOfDay.push(arrForTimes[hoursOfDay]);
          arrForTimes = undefined;

    	}
          
         
         
           
        }
       
       
           

      }

  function isDefaultDate(date) {
      if (!date) { return; }
      var result = date.year === $scope.options.defaultDate.getFullYear() &&
        date.month === $scope.options.defaultDate.getMonth() &&
        date.day === $scope.options.defaultDate.getDate() &&
        date.hours === $scope.options.defaultDate.getHours() &&
        date.minutes === $scope.options.defaultDate.getMinutes();
      return result;
   }
});
//Цикл для минут - создает массив объектов с минутами и полной датой
 // for(var j = 0; j<60;j++){
            	
 //            	var date = new Date($scope.selectedYear, MONTHS.indexOf($scope.selectedMonth), $scope.selectedDay, hour,j);
 //            	var obj = new minObj(j,date);
 //            	minutes.push(obj);
	
            	
 //            }

 //         arrForTimes[hoursOfDay].minutes = minutes;