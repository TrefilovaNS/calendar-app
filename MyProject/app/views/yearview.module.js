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

app.controller('CommonYearController', function CommonYearController($scope,YearWatcher){
   $scope.selectedYear = YearWatcher.getYear();
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
        $scope.updatedYear = YearWatcher.addYear($scope.selectedYear);
        $scope.$broadcast('updatedYear');
    }

});
app.controller('JanController', function JanController($scope,YearWatcher) {
   
   $scope.$watch('updatedYear', function() {    
      $scope.selectedYear = $scope.updatedYear;
      calculate();
    });
   
     calculate();

  function calculate(){
     $scope.options.defaultDate = new Date(YearWatcher.getYear(),0,1);
        }
   
});

app.controller('FebController', function FebController($scope,YearWatcher) {
   
   $scope.$watch('updatedYear', function() {    
      $scope.selectedYear = $scope.updatedYear;
      calculate();
    });
   
     calculate();

  function calculate(){
     $scope.options.defaultDate = new Date(YearWatcher.getYear(),1,1);
        }
   
});

app.controller('MarController', function MarController($scope,YearWatcher) {
   
   $scope.$watch('updatedYear', function() {    
      $scope.selectedYear = $scope.updatedYear;
      calculate();
    });
   
     calculate();

  function calculate(){
     $scope.options.defaultDate = new Date(YearWatcher.getYear(),2,1);
        }
   
});
app.controller('AprController', function AprController($scope,YearWatcher) {
   
   $scope.$watch('updatedYear', function() {    
      $scope.selectedYear = $scope.updatedYear;
      calculate();
    });
   
     calculate();

  function calculate(){
     $scope.options.defaultDate = new Date(YearWatcher.getYear(),3,1);
        }
   
});
app.controller('MayController', function MayController($scope,YearWatcher) {
   
   $scope.$watch('updatedYear', function() {    
      $scope.selectedYear = $scope.updatedYear;
      calculate();
    });
   
     calculate();

  function calculate(){
     $scope.options.defaultDate = new Date(YearWatcher.getYear(),4,1);
        }
   
});
app.controller('JunController', function JunController($scope,YearWatcher) {
   
   $scope.$watch('updatedYear', function() {    
      $scope.selectedYear = $scope.updatedYear;
      calculate();
    });
   
     calculate();

  function calculate(){
     $scope.options.defaultDate = new Date(YearWatcher.getYear(),5,1);
        }
   
});
app.controller('JulController', function JulController($scope,YearWatcher) {
   
   $scope.$watch('updatedYear', function() {    
      $scope.selectedYear = $scope.updatedYear;
      calculate();
    });
   
     calculate();

  function calculate(){
     $scope.options.defaultDate = new Date(YearWatcher.getYear(),6,1);
        }
   
});
app.controller('AugController', function AugController($scope,YearWatcher) {
   
   $scope.$watch('updatedYear', function() {    
      $scope.selectedYear = $scope.updatedYear;
      calculate();
    });
   
     calculate();

  function calculate(){
     $scope.options.defaultDate = new Date(YearWatcher.getYear(),7,1);
        }
   
});
app.controller('SepController', function SepController($scope,YearWatcher) {
   
   $scope.$watch('updatedYear', function() {    
      $scope.selectedYear = $scope.updatedYear;
      calculate();
    });
   
     calculate();

  function calculate(){
     $scope.options.defaultDate = new Date(YearWatcher.getYear(),8,1);
        }
   
});
app.controller('OctController', function OctController($scope,YearWatcher) {
   
   $scope.$watch('updatedYear', function() {    
      $scope.selectedYear = $scope.updatedYear;
      calculate();
    });
   
     calculate();

  function calculate(){
     $scope.options.defaultDate = new Date(YearWatcher.getYear(),9,1);
        }
   
});
app.controller('NovController', function NovController($scope,YearWatcher) {
   
   $scope.$watch('updatedYear', function() {    
      $scope.selectedYear = $scope.updatedYear;
      calculate();
    });
   
     calculate();

  function calculate(){
     $scope.options.defaultDate = new Date(YearWatcher.getYear(),10,1);
        }
   
});
app.controller('DecController', function DecController($scope,YearWatcher) {
   
   $scope.$watch('updatedYear', function() {    
      $scope.selectedYear = $scope.updatedYear;
      calculate();
    });
   
     calculate();

  function calculate(){
     $scope.options.defaultDate = new Date(YearWatcher.getYear(),11,1);
        }
   
});
//для каждого месяца - свой контроллер