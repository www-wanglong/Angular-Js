angular.module('myApp', ['ngMessages'])
.filter('capitalize', function() {
  return function(input) {
    if (input) {
      return input[0].toUpperCase() + input.slice(1)
    }
  }
})

.directive('valueChange', function($filter) {
  return {
    require: '?ngModel',
    link: function(scope, ele, attrs, ngModel) {
      if (!ngModel) {
        return 
      }
      ngModel.$formatters.unshift(function(value) {
        return $filter('number')(value)
      })
    }
  }
})

.directive('oneToTen', function() {
  return {
    require: '?ngModel',
    link: function(scope, ele, attrs, ngModel) {
      if (!ngModel) {
        return
      }
      ngModel.$parsers.unshift(
        function(viewValue) {
          var i = parseInt(viewValue)
          if (i >= 0 && i < 10) {
            ngModel.$setValidity('oneToTen', true)
            return viewValue
          } else {
            ngModel.$setValidity('oneToTen', false)
            return undefined
          }
        }
      )
    }
  }
})

.directive('ensureUnique', function($http) {
  return {
    restrict: "AE",
    require: 'ngModel',
    link: function(scope, ele, attrs, c) {
      scope.$watch(attrs.ngModel, function(n) {
        console.log(12)
        if (!n) {
          return
        }
        // $http({
        //   method: "POST",
        //   url: '/api/check/' + attrs.ensureUnique,
        //   data: {
        //     field: attrs.ensureUnique,
        //     value: scope.ngModel
        //   }
        // }).success(function(data) {
        //   c.$setValidity('unique', data.isUnique)
        // }).error(function(data) {
        //   c.$setValidity('unique', false)
        // })
      })

    }
  }
})

// 在失焦后验证
.directive('ngFocus',[function() {
  var FOCUS_CLASS = 'ng-focused'
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ctrl) {
      ctrl.$focused = false
      element.bind('focus', function(evt) {
        element.addClass(FOCUS_CLASS)
        scope.$apply(function() {
          ctrl.$focused = true
        })
      }).bind('blur', function(evt) {
        element.removeClass(FOCUS_CLASS)
        scope.$apply(function() {
          ctrl.$focused = false
        })
      })
    }
  }
}])

.controller('filterController', function($scope) {
  $scope.submitted = false
  $scope.signup = {
    change: 0
  }
  $scope.add = function() {
    $scope.signup.change++
  }
  $scope.signupForm = function() {
    if ($scope.signup_form.$valid) {

    } else {
      $scope.signup_form.submitted = true
    }
  }
})