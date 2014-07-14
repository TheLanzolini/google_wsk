var app = angular.module('myApp', []);

app.directive('lanzWelcome', function () {
  return {
    restrict: 'E',
    templateUrl: '../lanz-welcome/lanz-welcome.html'
  };
});

app.controller('LanzCtrl', function($scope, $http){
  $scope.api_key = '662f5bb2-350f-4b2d-b6fc-038e17b04827';
  $scope.region = 'na';
  $scope.request_suffix = '?api_key=' + $scope.api_key;
  $scope.request_version = 'v1.4'
  $scope.request_prefix = 'https://'+ $scope.region +'.api.pvp.net/api/lol/'+ $scope.region +'/'+ $scope.request_version +'/';
  // + $scope.request_method +'/'+ $scope.summoner_name +'?api_key='+ $scope.api_key;
  $scope.summoner_name;
  $scope.getSummoner = function(){
    var query = $scope.request_prefix +'summoner/by-name/'+ $scope.summoner_name + $scope.request_suffix;
    $http.get(query).success(function(data){ 
      $scope.summoner = data; 
      $scope.summonerId = $scope.summoner[$scope.summoner_name].id;
      $scope.request_version = 'v2.4';
      $scope.request_prefix = 'https://'+ $scope.region +'.api.pvp.net/api/lol/'+ $scope.region +'/'+ $scope.request_version +'/';
      var query = $scope.request_prefix +'league/by-summoner/'+ $scope.summonerId + $scope.request_suffix;
      $http.get(query).success(function(data){
        $scope.summoner_league = data;
        $scope.solo_queue = $scope.summoner_league[$scope.summonerId][0];
        $scope.league_entries = $scope.solo_queue.entries;
        for(var i=0;i<$scope.league_entries.length;i++){
          if($scope.league_entries[i].playerOrTeamId == $scope.summonerId){
            $scope.league_position = $scope.league_entries[i];
          }
        }
        $scope.request_version = 'v1.3';
        $scope.request_prefix = 'https://'+ $scope.region +'.api.pvp.net/api/lol/'+ $scope.region +'/'+ $scope.request_version +'/';
        var query = $scope.request_prefix +'game/by-summoner/'+ $scope.summonerId +'/recent'+ $scope.request_suffix;
        $http.get(query).success(function(data){
          $scope.recent_games = data.games;
          console.log($scope.recent_games);
          for(var i=0;i<$scope.recent_games.length;i++){
            console.log($scope.recent_games[i].stats.numDeaths);
          }
        });
      });
    });
    $scope.$watch('summoner_name', function(){
      $scope.summoner_name = $scope.summoner_name.toLowerCase().replace(/\s+/g,'');
    });
  };


});