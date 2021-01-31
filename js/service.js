angular.module('myApp.services', [])

   // 配置跨域名请求域名
  .config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'https://api.github.com/**']);
  })
  //组册一个应用服务
  // 希望在应用中所有的控制器之间共享用户名
  // 为了在控制器之间共享数据，需要在服务中添加一个用来存储用户名饿方法。服务在应用的生命周期内是单例模式的，因此可以将用户名安全的存储在其中
  .factory('githubService', function($http) {
    var githubUrl = 'https://api.github.com', githubUsername

    var runUserRequest = function(url) {
      return $http.get(githubUrl + '/users/' + githubUsername + '/' + url + '')
      return $http({
        method: 'JSONP',
        url: githubUrl + '/users/' + githubUsername + '/' + url + ''
      })
    }
    return {
      events: function() {
        return runUserRequest('events')
      },
      setUsername: function(githubUsername) {
        githubUsername = githubUsername
      }
    }
  })

  .provider('myService', {
    $get: function() {
      return {'username': 'auser'}
    }
  })

  .config(function(githubService1Provider) {
    githubService1Provider.setGithubUrl('https://api.github.com2')
  })

  // 希望在应用启动前配置githubService的url
  .provider('githubService1', {
    githubUrl: 'https://api.github.com',
    method: 'GET',
    setGithubUrl: function(url) {
      if (url) {
        githubUrl = url
      }
    },
    $get: function($http) {
      self = this
      console.log(self)
      return $http({ method: self.method, url: self.githubUrl + '/events' })
    }
  })


  .controller('ServiceController', function($scope, githubService, $timeout, myService, githubService1) {
    // 可以调用对象的事件函数
   $scope.events = githubService.events('auser')
    $scope.$watch('username', function(newUsername) {
      if (newUsername) {
        // 如果在进度中有一个超时
        if ($scope.timeout) {
          $timeout.cancel($scope.timeout)
        }
        $scope.timeout = $timeout(function() {
          githubService.events(newUsername).then(function(data, status, headers) {
            $scope.events = data.data
          })
        }, 1000)
      }
    })
    //$scope.setUsername = githubService.setUsername('long')
    //githubService.events()
    //console.log(myService.username)
    //console.log(githubService1)
  })