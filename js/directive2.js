angular.module('myApp', [])
  .controller('MainController', function() {
    this.name = 'Ari'
  })

  .directive('myDirective', function() {
    return {
      restrict: 'EA  ',
      require: '?ngModel',
      template: '<h3>{{myController.msg}}<h3>',
      controllerAs: 'myController',
      controller: function() {
        this.msg = 'hello word'
      },
      link($scope, $elem, attrs, ctrl) {
        console.log(ctrl)
      }
    }
  })