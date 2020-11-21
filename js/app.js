function MyController($scope, $timeout) {
  var updatedClock = function() {
    $scope.clock = { 
      now: new Date()
    }
    var updatedClock = function() {
      $scope.clock.now = new Date()
    }

    setInterval(function() {
      $scope.$apply(updatedClock)
    }, 1000)
  }
  updatedClock()
}