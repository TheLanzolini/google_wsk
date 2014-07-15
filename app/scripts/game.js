var app = angular.module('gameApp', []);

app.directive("gameDirective", function(){
  return {
      restrict: "E",
      scope: {
        columns: '@columns'
      },
      controller: function($scope, $element, $attrs){
        $scope.columns = $attrs.columns;
        $scope.rows = $attrs.rows;
        $scope.numbers = [1, 2, 3, 4, 5];
      },
      templateUrl: '../lanz-game/lanz-game-table.html'
  }
});





// function(scope, element, attr){
//       var columns = scope.$eval(attr.columns);
//       var rows = scope.$eval(attr.rows);
//       console.log(columns);
//       console.log(rows);
//     }