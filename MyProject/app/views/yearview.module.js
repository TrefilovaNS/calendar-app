'use strict';

var app = angular.module('YearView', [

]);

app.controller('YearController', function YearController($scope) {
	
  $scope.options = $scope.options || {};
  $scope.options.defaultDate = new Date ();
  $scope.nextYear = nextYear;
  $scope.resetToToday = resetToToday;


   var MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    var WEEKDAYS = ['MONDAY' , 'TUESDAY' , 'WEDNESDAY' , 'THURSDAY' , 'FRIDAY' , 'SATURDAY', 'SUNDAY'];
     
     $scope.$watch('options.defaultDate', function() {
      calculateSelectedDate();
    });

    //   $scope.$watch('selectedYear', function() {
    //     $scope.$broadcast('selectedYear');
    //     console.log('Hi!');
    // });

  

   function calculateSelectedDate() {

      $scope.selectedYear  = $scope.options.defaultDate.getFullYear();
      $scope.selectedMonth = MONTHS[$scope.options.defaultDate.getMonth()];
      $scope.selectedDay   = $scope.options.defaultDate.getDate();
    }

    function nextYear() {
      
        $scope.selectedYear += 1;
      //  var year = $scope.selectedYear;
     //   $scope.$broadcast('Year', year);

            
    }

     function resetToToday() {
        $scope.options.defaultDate = new Date();
        $scope.selectedYear  = $scope.options.defaultDate.getFullYear();
       
    }
});

app.controller('JanController', function JanController($scope) {
   
   // $scope.$watch('Year', function() {
   //   // $scope.selectedYear = args;
   //   //  calculate();
   //   console.log("Hello!")
   //  });

  calculate();

  function calculate(){
    $scope.options.defaultDate = new Date();
    $scope.selectedYear  = $scope.options.defaultDate.getFullYear();
    $scope.options.defaultDate = new Date($scope.selectedYear,0,1);
    
  }
    
   
});

app.controller('FebController', function FebController($scope) {
    
    $scope.options.defaultDate = new Date();
    $scope.selectedYear  = $scope.options.defaultDate.getFullYear();
    $scope.options.defaultDate = new Date($scope.selectedYear,1,1);
    
});
//для каждого месяца - свой контроллер