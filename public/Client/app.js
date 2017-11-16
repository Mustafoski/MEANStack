
var app = angular.module('lunchbar',['customFilters','cart','ngRoute','angular-jwt'])

.config(function ($routeProvider) {
       
    $routeProvider.when("/complete", {                
        templateUrl: "views/thankYou.html",
         access: {
        restricted: true
      }
    });
 
    $routeProvider.when("/placeorder", {                
        templateUrl: "views/placeOrder.html",
         access: {
        restricted: true
      }
    });
    
    $routeProvider.when("/checkout", {                
        templateUrl: "views/checkoutSummary.html",
         access: {
        restricted: true
      }
    });
 
    $routeProvider.when("/products", {                
        templateUrl: "views/productList.html",
         access: {
        restricted: true
      }
    });
    
    $routeProvider.when('/register', {
      templateUrl: 'views/register.html',
      controller: RegisterController,
      controllerAs: 'vm',
         access: {
        restricted: true
      }
    });
     $routeProvider.when('/', {
      templateUrl: 'views/register.html',
      controller: RegisterController,
      controllerAs: 'vm',
          access: {
        restricted: true
      }
    });
 
    $routeProvider.otherwise({                
        templateUrl: "views/register.html"            
    });
    
}); 






function run($rootScope, $location, $window, AuthFactory) {
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
      event.preventDefault();
      $location.path('/products');
    }
  });
}
