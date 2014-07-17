var app = angular.module('gameApp', []);

//bunch of stuff for directives
app.directive("gameDirective", function(){
  return {
      restrict: "E",
      scope: {
        columns: '@columns',
        rows: '@rows',
        headers: "@headers"
      },
      controller: function($scope, $element, $attrs){
        $scope.columns = parseInt($attrs.columns);
        $scope.rows = parseInt($attrs.rows);
        $scope.headers = $attrs.headers;
        $scope.numbers = [];
        for(var i=0;i<$scope.columns;i++){
          $scope.numbers.push(i);
        }
        console.log($scope.headers.split(' '));
      },
      templateUrl: '../lanz-game/lanz-game-table.html'
  }
});

app.controller("gameController", function($scope, $http){
  $scope.hello = 'hello';
  $scope.minionsKilled = 0;
  $http.get('https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/21506342/summary?season=SEASON3&api_key=662f5bb2-350f-4b2d-b6fc-038e17b04827')
    .success(function(data){
      for(var i=0;i<data.playerStatSummaries.length;i++){
        var tmk = data.playerStatSummaries[i].aggregatedStats.totalMinionsKilled;
        var tnmk = data.playerStatSummaries[i].aggregatedStats.totalNeutralMinionsKilled;
        var tnmks = data.playerStatSummaries[i].aggregatedStats.totalNeutralMinionKills;
        var tmks = data.playerStatSummaries[i].aggregatedStats.totalMinionKills;
        if(tmk != undefined){
          $scope.minionsKilled += tmk;
        }
        if(tnmk != undefined){
          $scope.minionsKilled += tnmk;
        }
        if(tnmks != undefined){
          $scope.minionsKilled += tnmks;
        }
        if(tmks != undefined){
          $scope.minionsKilled += tmks;
        }
      }
    });
  jQuery(function($){
    setTimeout(function(){ main(); }, 1000);
    
    function main(){
      var ctx = document.getElementById("canvas").getContext("2d");
      var w = $("#canvas").width();
      var h = $("#canvas").height();
      ctx.strokeStyle = 'black';
      ctx.strokeRect(0, 0, w, h);
      console.log($scope.minionsKilled);
      
    }
  });
});


