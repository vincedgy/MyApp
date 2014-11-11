(function () {

    'use strict';


    var attendeesServices = angular.module('myApp.attendeesServices', []);

    attendeesServices.factory('Attendees', function ($resource) {
        var AttendeesFactory = function () {
            this.attendees = [];
            this.AllAttendees = $resource('/api/session/:sessionId/attendees', {sessionId: '@id'});
            this.AttendeeByID = $resource('/api/session/:sessionId/attendees/:attendeeId', {sessionId: '@id', attendeeId: '@attId'});

            this.getAttendees = function (sessionID) {
                var attendees = [];
                this.AllAttendees.query({sessionId: sessionID}, function (data) {
                    for (var i = 0; i < data.length; i++) attendees[i] = data[i];
                });
                this.attendees = attendees;
                return this.attendees;
            };

            this.getAttendeeByID = function (sessionID, attendeeID) {
                return this.AttendeeByID.get({sessionId: sessionID, attendeeId: attendeeID});
            };

            this.reset = function () {
                console.log('Not implemented yet');
            }
        };

        console.log('Init Attendees factory');
        return new AttendeesFactory();
    });

})();