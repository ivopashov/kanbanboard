'use strict';

var app = angular.module('app', ['ui.bootstrap', 'ui.router', 'angular-loading-bar', 'ui.tree']);

app.config(['$stateProvider', '$locationProvider', '$httpProvider', '$urlRouterProvider',
    function ($stateProvider, $locationProvider, $httpProvider, $urlRouterProvider) {

        //================================================
        // Make urls case insensitive
        //================================================
        $urlRouterProvider.rule(function ($injector, $location) {
            var path = $location.path(), normalized = path.toLowerCase();
            if (path != normalized) {
                $location.replace().path(normalized);
            }
        });

        //================================================
        // Routes
        //================================================
        $urlRouterProvider.otherwise("/");

        $stateProvider.state('board', {
            url: '/board',
            templateUrl: '/App/templates/board.html',
            controller: 'boardController'
        });

    }]);