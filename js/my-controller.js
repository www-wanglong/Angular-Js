angular.module('emailParser', [])
  .config(['$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('__')
    $interpolateProvider.endSymbol('__')
  }])

  .factory('EmailParser',['$interpolate', function($interpolate) {
    // 处理解析的服务
    return {
      parse: function(text, context) {
        var template = $interpolate(text)
        return template(context)
      }
    }
  }])
var app = angular.module('myApp', ['emailParser'])

  app.controller('myController', ['$rootScope', '$scope', '$parse', '$interpolate', 'EmailParser',
  function($rootScope, $scope, $parse, $interpolate, EmailParser) {
    $scope.name = 'long'
    $scope.$watch('expr', function(newVal, oldVal, scope) {
      if (newVal != oldVal) {
        // 用该表达式来设置parseFun
        var parseFun = $parse(newVal)
        $scope.parsedValue = parseFun(scope)
      }
    })

    $scope.$watch('emailBody', function(body) {
      if (body) {
        //var template = $interpolate(body);
        $scope.previewText = EmailParser.parse(body, {
          to: $scope.to
        })
      }
    })
  }])

  

  app.controller('firstController', function($scope) {
    
    $scope.counter = 1
    
    $scope.add = function add(value) {
      $scope.counter += value
    }

    $scope.subtract = function subtract(value) {
      $scope.counter -= value
    }
  })

  app.controller('ParentController', function($scope) {
    $scope.person = { greeted: false }
  })

  app.controller('ChildController', function($scope) {
    $scope.sayHello = function() {
      $scope.person.name = 'long'
    }
  })