(function () {
    'use strict';

    angular.module('samosapp.controllers', [])

    //Controller for header
    .controller('headerController', function ($scope, $state, $ionicSideMenuDelegate, Events) {
        $scope.state = $state;
        $scope.sideMenu = $ionicSideMenuDelegate;

        //Change title in header whenever state changes
        $scope.$watch('state.current', function () {
            $scope.title = $state.current.title;
        });

        //Toggle the settings menu on the left side
        $scope.toggleLeft = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };

        //Allow dragging only when side menu is open
        $scope.$watch('sideMenu.isOpenLeft()', function () {
            $scope.sideMenu.canDragContent($scope.sideMenu.isOpenLeft());
        });

        //Test button
        $scope.toggleRight = function () {

        };
    })

    //Controller for the slidebox and tab features
    .controller('sliderTabController', function ($scope, $state, $ionicSlideBoxDelegate, $ionicTabsDelegate) {

        //Change tab and state when the slide has changed
        $scope.onSlideChange = function ($index) {
            $ionicTabsDelegate.select($index);
            $scope.changeState($index);
        };

        //Set current events to be the first page users see
        $scope.setFirstSlide = 1;

        //Set to corresponding page when tab is clicked
        $scope.onTabClick = function (index) {
            $ionicSlideBoxDelegate.slide(index);
            $ionicTabsDelegate.select(index);
            $scope.changeState(index);
        };
        
        //Change state depending on slide
        $scope.changeState = function (index) {
            switch (index) {
                case 0:
                    $state.go("sliderTab.club");
                    break;
                case 1:
                    $state.go("sliderTab.current");
                    break;
                case 2:
                    $state.go("sliderTab.upcoming");
                    break;
                default:
                    console.log("changeState was given index value != 0, 1, or 2");
            };
        };

    })
    
    //Controller for the club page
    .controller('clubController', function ($scope, $ionicModal, LoginService, Events) {
        var self = this;
        var getClubEvents;

        $scope.eventID = 0;
        $scope.isExistingEvent = false;
        $scope.login = window.localStorage.getItem("isLoggedIn");
        $scope.clubName = window.localStorage.getItem("clubName");

        //Check login credentials when login button is selected
        $scope.onLogin = function (user) {
            LoginService.login(user.name, user.password).then(function (response) {
                if (response.data.club_username == user.name) {
                    window.localStorage.setItem("isLoggedIn", true);
                    window.localStorage.setItem("clubName", response.data.club_name)
                    window.localStorage.setItem("username", user.name);
                    //Check if localStorage works properly on device
                    $scope.login = true;
                } else {
                    //alert the user that login failed
                    console.log("Username and password do not match");
                };
            });
        };

        //Logout button
        $scope.onLogout = function () {
            window.localStorage.setItem("isLoggedIn", false);
            $scope.login = false;
        };
        
        //Load template for modal
        $ionicModal.fromTemplateUrl('templates/event-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        //Open modal which allows user to input event details
        $scope.openModal = function (id, event) {
            if (event == null) {
                self.details = {};
                $scope.isExistingEvent = false;

            } else {
                $scope.isExistingEvent = true;
                $scope.eventID = Object.keys($scope.clubEvents)[id];

                //This fixes the Date object automatically converting to PST 
                var tempTime = new Date('1970-01-01T' + event.time_start);
                tempTime.setHours(tempTime.getUTCHours());

                //Fill modal with existing event details
                self.details = {
                    'product': event.product,
                    'location': event.location,
                    'date': new Date(event.date),
                    'time': tempTime,
                    'description': event.description
                };
            }
            $scope.modal.show();
        };

        //Close modal when finished with it
        $scope.closeModal = function () {
            $scope.modal.hide();
        };
        //Cleanup the modal when we're done with it
        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });

        //Add or update an event
        $scope.updateEvent = function (isNew, event) {
            var details = {};

            //Retrieve all the details from the modal
            details.club = $scope.clubName;
            details.product = event.product;
            details.date = event.date;
            details.location = event.location
            details.time = (new Date(event.time)).toLocaleTimeString();
            details.description = event.description;

            if (isNew === 'true') {
                Events.addEvent(details).then(function (data) {
                    $scope.onRefresh();
                    console.log('Finished adding new event');
                });
            } else {
                Events.updateEvent($scope.eventID, details).then(function (data) {
                    $scope.onRefresh();
                    console.log('finished updating event');
                });
            };
            $scope.closeModal();
        };

        //Delete an existing event
        $scope.removeEvent = function () {
            Events.removeEvent($scope.eventID).then(function (data) {
                $scope.onRefresh();
                console.log('Finished removing event');
            });
            $scope.closeModal();
        };

        //Converts a date to a prettier version
        $scope.readableDate = function (date) {
            return (new Date(date)).toDateString();
        };

        //Retrieve Club Events
        (getClubEvents = function () {
            return Events.getEvent('club').then(function (response) {
                $scope.clubEvents = response.data;
            });
        }).call();

        //Call the retrieve events function again when refreshing
        $scope.onRefresh = function () {
            getClubEvents().finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

    })

    //Controller for the current events page
    .controller('currentController', function ($scope, Events) {

        var getCurrent;

        //Retrieve current Events
        (getCurrent = function () {
            return Events.getEvent('current').then(function (response) {
                $scope.currentEvents = response.data;
            });
        }).call();

        //Call the retrieve events function again when refreshing
        $scope.onRefresh = function () {
            getCurrent().finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
    })
    
    //Controller for the upcoming events page
    .controller('upcomingController', function ($scope, Events) {
        var getUpcoming;

        //Array of weekday names
        var weekdays = new Array(7);
        weekdays[0] = "Sunday";
        weekdays[1] = "Monday";
        weekdays[2] = "Tuesday";
        weekdays[3] = "Wednesday";
        weekdays[4] = "Thursday";
        weekdays[5] = "Friday";
        weekdays[6] = "Saturday";

        //Toggle list accordion: show/hide
        this.toggleEvent = function (event) {
            if (this.isEventShown(event)) {
                this.shownEvent = null;
            } else {
                this.shownEvent = event;
            }
        };

        //Check if list accordion is displayed
        this.isEventShown = function (event) {
            return this.shownEvent === event;
        };

        //Look for the first instance of date class and show that divider        
        this.showFirstClass = function (dateString) {
            document.getElementsByClassName(dateString)[0].style.display = "block";
            return false;
        };

        //Append day of week in front of the date
        this.addDayOfWeek = function (date) {
            var day = new Date(date);
            return weekdays[day.getDay()] + " " + date;
        };

        //Show a more readable version of the date
        this.readableDate = function (date) {
            return (new Date(date)).toDateString();
        };

        //Retrieve upcoming Events
        (getUpcoming = function () {
            return Events.getEvent('upcoming').then(function (response) {
                $scope.upcomingEvents = response.data;
            });
        }).call();

        //Call the retrieve events function when refreshing
        $scope.onRefresh = function () {
            getUpcoming().finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
    });
})();