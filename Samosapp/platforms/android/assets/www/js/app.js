(function () {
    'use strict';

    angular.module('samosapp', ['ionic', 'samosapp.controllers', 'samosapp.services'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        //Always force position of tabs to be at the bottom
        $ionicConfigProvider.tabs.position('bottom');

        $stateProvider
        //Abstract state for the slider-tab feature
        .state('sliderTab', {
            url: "/index",
            abstract: true,
            templateUrl: "templates/slider-tab.html",
            controller: 'sliderTabController'
        })

        // Each tab has its own nav history stack:
        .state('sliderTab.club', {
            title: "CLUB PAGE",
            url: '/club',
            views: {
                'page-club': {
                    templateUrl: 'templates/page-club.html',
                    controller: 'clubController'
                }
            }
        })

        .state('sliderTab.current', {
            title: "TODAY'S EVENTS",
            url: '/current',
            views: {
                'page-current': {
                    templateUrl: 'templates/page-current.html',
                    controller: 'currentController'
                }
            }
        })

        .state('sliderTab.upcoming', {
            title: "UPCOMING EVENTS",
            url: '/upcoming',
            views: {
                'page-upcoming': {
                    templateUrl: 'templates/page-upcoming.html',
                    controller: 'upcomingController'
                }
            }
        });

        // Default State
        $urlRouterProvider.otherwise('/index/current');

    })

    //Custom filter for ng-repeat for sorting object of objects
    //http://justinklemm.com/angularjs-filter-ordering-objects-ngrepeat/
    .filter('orderByDate', function () {
        return function (items, field, reverse) {
            var filtered = [];
            angular.forEach(items, function (item) {
                filtered.push(item);
            });
            filtered.sort(function (a, b) {
                return (a[field] > b[field] ? 1 : -1);
            });
            if (reverse) filtered.reverse();
            return filtered;
        };
    });
})();