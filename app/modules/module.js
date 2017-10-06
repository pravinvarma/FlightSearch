(function (angular) {
    'use strict';
    angular.module('flightSearchModule', ['ngMaterial', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']).config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('LoadingInterceptor');
}]);


})(angular);