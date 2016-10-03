'use strict';

var app = angular.module('YearView', [

]);
app.factory('YearWatcher', function() {
  // private variable
  var date = new Date();
  var _dataObj = date.getFullYear();
  
  return {
    dataObj: _dataObj
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

    function nextYear() {
      
        $scope.selectedYear += 1;
      //  var year = $scope.selectedYear;
     //   $scope.$broadcast('Year', year);
        $scope.$broadcast('selectedYear');
      
        //console.log(YearWatcher.dataObj)
            
    }

    $scope.$watch('selectedYear', function() {
      YearWatcher.dataObj = $scope.selectedYear;
      // console.log(YearWatcher.dataObj)
   });
  
  //YearWatcher.dataObj = 2017;
  
     function resetToToday() {
        $scope.options.defaultDate = new Date();
        $scope.selectedYear  = $scope.options.defaultDate.getFullYear();
       
    }
});
app.controller('CommonYearController', function CommonYearController($scope,YearWatcher){
   $scope.selectedYear = YearWatcher.dataObj;
  
    
  console.log(YearWatcher.dataObj)
  // $scope.selectedYear = 2016;
  // $scope.$watch('data', function() {
  //        // YearWatcher.dataObj = $scope.selectedYear;
  //       console.log(YearWatcher.dataObj)
  //   });

});
app.controller('JanController', function JanController($scope) {
   
   // $scope.$watch('Year', function() {
   //   // $scope.selectedYear = args;
   //   //  calculate();
   //   console.log("Hello!")
   //  });

  $scope.$watch('selectedYear', function() {
    
     calculate();
     
    });
  calculate();

  function calculate(){
    
    $scope.options.defaultDate = new Date($scope.selectedYear,0,1);
    
  }
    
   
});

app.controller('FebController', function FebController($scope) {
    
    $scope.options.defaultDate = new Date();
    $scope.selectedYear  = $scope.options.defaultDate.getFullYear();
    $scope.options.defaultDate = new Date($scope.selectedYear,1,1);
    
});
//для каждого месяца - свой контроллер