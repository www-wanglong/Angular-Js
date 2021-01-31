angular.module('myApp', [])
  .factory('greeter', function() {
    return {
      greet: function(msg) {
        alert(msg)
      }
    }
  })

  .controller('MyController', function($scope, greeter) {
    $scope.sayHello = function() {
      greeter.greet('Hello')
    }
  })