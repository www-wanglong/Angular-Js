function MyController($scope, $timeout) {
  // 首字母是否为大写
  $scope.isCapitalized = function(str) {
    return str[0] == str[0].toUpperCase()
  }
  var updatedClock = function() {
    // JavaScript自身的特点 以及它在传递值和引用时的不同处理 通常在是视图中通过对象的属性
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