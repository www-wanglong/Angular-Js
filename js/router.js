angular.module('myApp', ['ngRoute'])
  .run(['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.$on('$routeChangeStart', function(evt, next, current) {
      console.log(evt)
    })
  }])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        template: '<h2>home<h2>',
        controller: function($scope, $location) {
          console.log($location.replace())
        }
      })
      
      .when('/inbox/:name', {
        template: '<h2>inbox<h2>',
        controller: function($scope, $location) {
          console.log($location.path())
        }
      })
      .otherwise({
        redirectTo: function(route, path, search) {
          // 当前路径中提取出的路由参数
          // 当前路径
          // 当前URL中的查询串
          console.log(route, path, search)
          return '/'
        }
      })
  }])