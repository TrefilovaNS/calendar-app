'use strict';

var app = angular.module('WeekView', [

]);

app.controller('WeekController', function WeekController($scope, Popeye) {
		
		$scope.options = $scope.options || {};
		$scope.options.defaultDate = new Date();
		
		$scope.nextWeek = nextWeek;
		$scope.onClick = onClick;
		$scope.resetToToday = resetToToday;
		$scope.weekDays = weekDays;
		

var MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
var WEEKDAYS = ['','MONDAY' , 'TUESDAY' , 'WEDNESDAY' , 'THURSDAY' , 'FRIDAY' , 'SATURDAY', 'SUNDAY'];

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
      $scope.$on(nextWeek);
    }
		
	$scope.$watch('options.defaultDate', function() {
      calculateSelectedDate();
    });

	$scope.$watch('selectedStartWeek' && 'selectedEndWeek', function() {
      calculateDaysOfWeek();
    });

     $scope.$watch('events', function() {
      createMappedEvents();
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
        			$scope.selectedMonthNumber = 1;
      			} else {
        			$scope.selectedMonth = MONTHS[currIndex + 1];
        			$scope.selectedMonthNumber = currIndex + 1;
        			$scope.selectedDay = 7;
      			}
		}else{
			$scope.selectedDay += 7;
			$scope.selectedMonthNumber = currIndex;
		}
 		

 		var newDate = new Date($scope.selectedYear,$scope.selectedMonthNumber,$scope.selectedDay,0);
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

 	$scope.daysOfWeek = [];
 		$scope.daysWithHours = [];
      	var startWeek = $scope.selectedStartWeek;
		var endWeek = $scope.selectedEndWeek;

		for(var i = 1; i<8;i++){
			var daysOfWeek = [];
			var weekday = moment(startWeek).weekday(i).toDate();
			var daysOfWeekWithHours = [];
			//daysOfWeek.push(weekday)
         	for(var j = 0; j<24;j++){
         		
         		var hour = j;
         		var date = new Date(weekday.getFullYear(),weekday.getMonth(),weekday.getDate(),hour)
         		daysOfWeek[hour] = {
	            year: weekday.getFullYear(),
	            month: MONTHS[weekday.getMonth()],
	            day: weekday.getDate(),
	            hour: hour,
	            date: date,
	            _month : weekday.getMonth() + 1
           	 };
           	 if($scope.mappedEvents){
				bindEvent(daysOfWeek[hour]);
			}
           	 	daysOfWeekWithHours.push(daysOfWeek[j]); 
         	}
			
         	
         	// $scope.daysWithHours.push(daysOfWeekWithHours[i-1]);
            $scope.daysOfWeek.push(daysOfWeek[i-1]);
            daysOfWeek = undefined;

            $scope.daysWithHours.push(daysOfWeekWithHours);
 			// console.log($scope.daysWithHours);
 			
	 		}
	 		// console.log($scope.daysWithHours);
		}
         
      

  function onClick(date, domEvent) {
      
    if(!date){ return; 
    }else if (!date.event[0]) { return; 
      }else{
          // Open a modal to show the selected event
    var modal = Popeye.openModal({
      templateUrl: "views/modalContent.html",
      controller: "DateController",
      resolve: {
        clickedEvent: function () {
          return date.event[0];
      }
    }
      
    });

   

    }
    
    }

  function bindEvent(date) {
      if (!date || !$scope.mappedEvents) { return; }
      date.event = [];
      $scope.mappedEvents.forEach(function(event) {
        if (date.date.getFullYear() === event.date.getFullYear()
            && date.date.getMonth() === event.date.getMonth()
            && date.date.getDate() === event.date.getDate()
            && date.date.getHours() === event.date.getHours()) {
          date.event.push(event);
        }
      });
    }
});
app.controller('DateController', function DateController($scope, Popeye, $location, clickedEvent) {

$scope.name = clickedEvent.name;
$scope.description = clickedEvent.description;
$scope.date = clickedEvent.date;
$scope.duration = clickedEvent.duration;
$scope.place = clickedEvent.place;

});