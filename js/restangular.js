angular.module('myApp', ['restangular', 'ngRoute', 'ngCookies'])
  //定义应用的访问规则
  .constant('ACCESS_LEVELS', {
    pub: 1,
    user: 2,
  })

  // 为了验证用户的身份 需要创造一个服务来对已经存在的用户进行监视。同时需要让服务能够访问浏览器的cookie，这样当用户重新登录时，只要会话有效就无需再次进行身份验证
  .factory('Auth', function($cookies, ACCESS_LEVELS) {
    var _user = $cookies.get('user')

    var setUser = function(user) {
      if (!user.role || user.role < 0) {
        user.role = ACCESS_LEVELS.pub
      }
      _user = user
      $cookies.put('user', _user)
    }

    return {
      ifAuthorized: function(lvl) {
        return _user && _user.role >= lvl
      },
      setUser: setUser,
      isLoggedIn: function() {
        return _user ? true : false
      },
      getUser: function() {
        return _user ? _user.id : null
      },
      getToken: function() {
        return _user ? _user.token : ''
      },
      logout: function() {
        $cookies.remove('user')
        _user = null
      }
    }
  })

  .run(function($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function(evt, next, curr) {
      if (!Auth.ifAuthorized(next.$$route.access_level)) {
        if (Auth.isLoggedIn()) {
          $location.path('/')
        } else {
          $location.path('login')
        }
      }
    })
  })


  .config(['$routeProvider', 'ACCESS_LEVELS', function($routeProvider, ACCESS_LEVELS) {
    $routeProvider
      .when('/', {
        controller: function() {},
        template: '<span>pub</span>',
        access_level: ACCESS_LEVELS.pub
      })
      .when('/account', {
        controller: function() {},
        template: '<span>user</span>',
        access_level: ACCESS_LEVELS.user
      })
      .otherwise({
        redirectTo: '/'
      })
  }])
  // 保护API访问的资源
  .config(function($httpProvider) {
    // 构造拦截器
    var interceptor = function($q, $rootScope) {
      return {
        'response': function(resp) {
          console.log(11)
          if (resp.config.url === '/api/login') {
            Auth.setToken(resp.data.token)
          }
          return resp
        },
        'responseError': function(rejection) {
          // 错误处理
          switch(rejection.status) {
            case 401:
              if (rejection.config.url !== 'api/login') {
                $rootScope.$broadcast('auth:loginRequired')
              }
              break;
            case 403:
              $rootScope.$broadcast('auth:forbidden')
              break;
            case 404:
              $rootScope.$broadcast('page:notFound')
              break;
            case 500:
              $rootScope.$broadcast('server:error')
              break

          }
        }
      }
    }
    // 将拦截器和$http的request/response链整合在一起
    $httpProvider.interceptors.push(interceptor)
  })
  .config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'https://api.github.com/**']);
  })
  // 为了在angularJs中使用CORS，首先需要告诉Angular Js正在使用CORS。使用config()方法在应用模块上设置两个参数
  // .config(function($httpProvider) {
  //   $httpProvider.defaults.useXDomain = true
  //   delete $httpProvider.defaults.headers.common['X-Requested-With']
  // })
  .controller('MyController', function(UserService, Restangular, $http) {
    // var searches = Restangular.allUrl('one', 'http://google.com/')
    // searches.getList('inboxes')
    // UserService.getList().then(function(user) {
    //   user.getList('inboxes')
    // })
    // UserService.get().then(function(user) {
    //   user.getList('inboxes')
    // })

    var messages = Restangular.one('messages', 'abc123');
    //var allMeaages = messages.getList()

    var newMessage = {
      body: 'Hello Word'
    }
    // post请求
    //messages.post('replies', newMessage)
    // 
    $http.jsonp('https://api.github.com').then(function(data) {

    })
  })

  .factory('UserService', ['Restangular', function(Restangular) {
    return Restangular.one('users', 'abc123')

  }])