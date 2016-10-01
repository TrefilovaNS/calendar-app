'use strict';

var app = angular.module('YearView', [

]);

app.controller('YearController', function YearController($scope) {
	
  $scope.options = $scope.options || {};
  $scope.options.defaultDate = new Date ();


   var MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    var WEEKDAYS = ['MONDAY' , 'TUESDAY' , 'WEDNESDAY' , 'THURSDAY' , 'FRIDAY' , 'SATURDAY', 'SUNDAY'];
     $scope.$watch('options.defaultDate', function() {
      calculateSelectedDate();
    });




   function calculateSelectedDate() {
      if ($scope.options.defaultDate) {
        $scope.options._defaultDate = new Date($scope.options.defaultDate);
      } else {
        $scope.options._defaultDate = new Date();
      }

      $scope.selectedYear  = $scope.options._defaultDate.getFullYear();
      $scope.selectedMonth = MONTHS[$scope.options._defaultDate.getMonth()];
      $scope.selectedDay   = $scope.options._defaultDate.getDate();
    }


});

//для каждого месяца - свой контроллер