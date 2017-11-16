var app = angular.module("lunchBarAdmin", ["ngRoute","angular-jwt"]);

app.config(function ($routeProvider) {


$routeProvider.when("/", {
    templateUrl: "views/adminLanding.html"
});

$routeProvider.when("/main", {
    templateUrl: "views/adminMain.html",
     access: {
        restricted: true
      }
});

 $routeProvider.otherwise({
     redirectTo: "views/adminLanding.html"
    });

});



function run($rootScope, $location, $window, AuthFactory) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
        if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
          event.preventDefault();
          $location.path('/');
        }
    });
}
