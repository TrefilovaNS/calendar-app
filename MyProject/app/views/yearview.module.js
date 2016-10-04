'use strict';

var app = angular.module('YearView', [

]);
app.factory('YearWatcher', function() {
  // private variable
  var date = new Date();
  // var yearDate = 
  var _dataObj = {
    yearDate: date.getFullYear()
  }
  function addYear (year) {
        return _dataObj.yearDate = year;
  };
  function getYear (){
    return _dataObj.yearDate;
  }
  return {
    
    addYear: addYear,
    getYear: getYear
  };
})
app.controller('YearController', function YearController($scope,YearWatcher) {
	
  $scope.options = $scope.options || {};
  $scope.options.defaultDate = new Date ();
  $scope.nextYear = nextYear;
  $scope.resetToToday = resetToToday;



   var MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    var WEEKDAYS = ['MONDAY' , 'TUESDAY' , 'WEDNESDAY' , 'THURSDAY' , 'FRIDAY' , 'SATURDAY', 'SUNDAY'];
     
     $scope.$watch('options.defaultDate', function() {
      calculateSelectedDate();
    });

      $scope.$watch('selectedYear', function() {
         
         
        // console.log(YearWatcher.dataObj)
    });

  

   function calculateSelectedDate() {

      $scope.selectedYear  = $scope.options.defaultDate.getFullYear();
      $scope.selectedMonth = MONTHS[$scope.options.defaultDate.getMonth()];
      $scope.selectedDay   = $scope.options.defaultDate.getDate();
    }

    

    $scope.$watch('selectedYear', function() {
      YearWatcher.dataObj = $scope.selectedYear;
      // console.log(YearWatcher.dataObj)
   });
  
  //YearWatcher.dataObj = 2017;
  
    
});
app.controller('CommonYearController', function CommonYearController($scope,YearWatcher){
   $scope.selectedYear = YearWatcher.getYear();
    
  //console.log(YearWatcher.dataObj)

  $scope.nextYear = nextYear;
  $scope.resetToToday = resetToToday;

  function nextYear() {
      
        $scope.selectedYear += 1;
        $scope.updatedYear = YearWatcher.addYear($scope.selectedYear);
        $scope.$broadcast('updatedYear');
       
            
    }

  function resetToToday() {
        $scope.defaultDate = new Date();
        $scope.selectedYear  = $scope.defaultDate.getFullYear();
       
    }

});
app.controller('JanController', function JanController($scope,YearWatcher,$timeout) {
   
   $scope.$watch('updatedYear', function() {
    
     $scope.selectedYear = $scope.updatedYear;
      calculate();
    
    });
   
 
     calculate();

  function calculate(){
    
    $scope.options.defaultDate = new Date(YearWatcher.getYear(),0,1);
    
  }

 //    $timeout (function () {
           
 //           calculate();
 //           // console.log($scope.selectedYear)
 // }, 1000)

   
    
   
});

app.controller('FebController', function FebController($scope) {
    
    $scope.options.defaultDate = new Date();
    $scope.selectedYear  = $scope.options.defaultDate.getFullYear();
    $scope.options.defaultDate = new Date($scope.selectedYear,1,1);
    
});
//для каждого месяца - свой контроллер