angular.module('myApp', [])
  // $q服务在他的deferred 
  .factory('GithubService', ['$q', function($q, $http) {
    // 创建多长时间运行的请求
    var getEventsFromRepo = function() {

    }
    var service = {
      makeMultipleRequests: function(repos) {
        var d = $q.defer(), percentComplete = 0, output = []
        for(var i = 0; i < repos.length; i++) {
          output.push(getEventsFromRepo(repos[i]))
          percentComplete = (i+1) / repos.length * 100
          d.notify(percentComplete)
        }

        return d.promise
      }
    }
    return service
  }])
  .controller('MyController', function($scope, GithubService) {
    GithubService.makeMultipleRequests(['auser/beehive', 'angular/angular.js']).then(function() {
      console.log('success')
    }, function(error) {
      console.error('error')
    }, function(percentComplete) {
      $scope.progress = percentComplete
    })
  })