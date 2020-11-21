angular.module('myApp', [])
  .controller('myController', function($rootScope, $scope) {
    $scope.name = 'long'
    console.log($rootScope)
  })