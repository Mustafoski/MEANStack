angular.module('lunchBarAdmin').directive('mhNavigation', mhNavigation);

function mhNavigation() {
  return {
    restrict: 'E',
    templateUrl: 'navigation-directive/navigation-directive.html'

  };
}
