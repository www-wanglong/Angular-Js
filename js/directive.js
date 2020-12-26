angular.module('myApp', [])
  .directive('myDirective', function() {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        myUrl: '=someAttr', // 将指令私有的myURL同DOM中some-attr属性的值绑定起来
        myLinkText: '@'
      },
      template: '<div>\
                  <label>my Url</label>\
                  <input type="text" ng-model="myUrl" />\
                   <a href="{{ myUrl }}">{{ myLinkText }}</a>\
                 </div>',
      controller: function($scope) {
      }
    }
  })
  .run(function($rootScope) {
    // 使用.run访问$rootScope
    $rootScope.rootProperty = 'root scope'
  })
  
  .controller('ParentController', function($scope) {
    $scope.parentProperty = 'parent scope'
  })
  
  .controller('ChildController', function($scope) {
    $scope.childProperty = 'child scope'
    $scope.fullSentenceFromChild = 'Same $scope: We can access: ' + 
    $scope.rootProperty + 'and ' + $scope.parentProperty + 'and ' + $scope.childProperty
  })

  .controller('SomeController', function($scope) {
    $scope.someBareValue = 'hello computer'
    // 创建模型
    $scope.someModel = {
      someProperty: 'hello computer',
      someValue: 'hello computer'
    }
    // 设置$scope自身操作
    $scope.someAction = function() {
      $scope.someModel.someValue = 'hello human from parent'
    }
  })

  .controller('SomeChildController', function($scope) {
    $scope.childAction = function() {
      $scope.someModel.someValue = 'hello human from child'
    }
  })

  .directive('myDirective1', function() {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
      },
      template: '<div>Inside {{ myProperty }}</div>'
    }
  })