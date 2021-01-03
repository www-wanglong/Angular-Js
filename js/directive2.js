angular.module('myApp', [])
  .controller('MainController', function() {
    this.name = 'Ari'
  })

  .directive('myDirective', function() {
    return {
      restrict: 'EA',
      require: 'ngModel',
      controllerAs: 'myController',
      controller: function() {
        this.msg = 'hello word'
      },
      link($scope, $elem, attrs, ngModel) {
        console.log(ngModel)
        ngModel.$render = function() {
          $elem.html(ngModel.$viewValue || 'None')
        }
      }
    }
  })

  // .directive('myDirective', function() {
  //   return {
  //     compile: function(tEle, tAttrs, transcludeFn) {
  //       var tplEl = angular.element('<div><h2></h2></div>')
  //       var h2 = tplEl.controller.find('h2')
  //       h2.attr('type', tAttrs.type)
  //       h2.attr('ng-model', tAttrs.ngModel)
  //       h2.val('hello')
  //       tEle.replaceWith(tplEl)
  //       return function(scope, ele, attrs) {

  //       }

  //     }
  //   }
  // })