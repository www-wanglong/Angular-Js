angular.module('myApp', ['ngResource'])
  .controller('MyController', function(UserService) {
    UserService.update({id: 3}, {name: 'long',ageS: 'w'}, () => {}, () => {
      console.error('ss')
    })
  })

  .service('UserService', function($resource) {
    var user = $resource('https://www.bnaidu.com/api/users/:userId.json', {userId: '@id'}, {
      update: {
        method: 'POST',
        params: {
          age: '@ageS'
        }
      }
    })
    return user
  })