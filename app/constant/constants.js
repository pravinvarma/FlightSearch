angular.module('flightSearchModule')
.constant('constants',{
    url: 'https://www.googleapis.com/qpxExpress/v1/trips/search?key=',
    token: 'AIzaSyD9E6dYytewk1p8lXjKOMHRpPDpWEQqsBk',
    flightFareURL: 'json-response/jsondata.json',
    airportURL: 'json-response/airpot.json',
    config: {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
});
