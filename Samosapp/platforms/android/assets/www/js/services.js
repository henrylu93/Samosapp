(function () {
    'use strict';

    angular.module('samosapp.services', [])

    .factory('Chats', function () {

        //Decide format for date, depending on how server can return it
        //Change orderBy Date in page-upcoming
        //Change date conversion when displaying in date divider

    })

    //Service for both current and upcoming Events at the moment
    .service('Events', function ($http) {

        //Retrieve list of events depending on type
        this.getEvent = function (type) {
            var eventData;

            if (type === 'current') {
                //TODO: change date to present
                eventData = { 'type': 'current', 'data': '2015-08-05' };
            } else if (type === 'upcoming') {
                eventData = { 'type': 'upcoming', 'data': '2015-08-05' };
            } else if (type === 'club') {
                eventData = { 'type': 'club', 'data': window.localStorage.getItem('clubName')};
            }

            // $http() returns a $promise that we can add handlers with .then()
            return $http({
                method: 'POST',
                url: 'http://181.224.138.55/~mcgillu4/henry/getEvent.php',
                //params: 'limit=10, sort_by=created:desc', //?
                //headers: { 'Authorization': 'Token token=xxxxYYYYZzzz' }//?
                data: eventData
            });
        };

        //Add a new event
        this.addEvent = function (details) {
            return $http({
                method: 'POST',
                url: 'http://181.224.138.55/~mcgillu4/henry/addEvent.php',
                data: {
                    'club': details.club,
                    'product': details.product,
                    'location': details.location,
                    'date': details.date,
                    'time_start': details.time,
                    'time_end': details.time,
                    'description': details.description
                }
            });
        };

        //Update an existing event
        this.updateEvent = function (id, details) {
            return $http({
                method: 'POST',
                url: 'http://181.224.138.55/~mcgillu4/henry/updateEvent.php',
                data: {
                    'id': id,
                    'club': details.club,
                    'product': details.product,
                    'location': details.location,
                    'date': details.date,
                    'time_start': details.time,
                    'time_end': details.time,
                    'description': details.description
                }
            });
        };

        //Remove an existing event
        this.removeEvent = function (id) {
            return $http({
                method: 'POST',
                url: 'http://181.224.138.55/~mcgillu4/henry/removeEvent.php',
                data: { 'id': id }
            });
        }
    })

    //Login Service
    .service('LoginService', function ($http) {
        this.login = function (username, password) {
            return $http({
                method: 'POST',
                url: 'http://181.224.138.55/~mcgillu4/henry/clubLogin.php',
                data: { 'username': username, 'password': password }
            });
        };
    })
})();