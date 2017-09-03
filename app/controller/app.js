(function (angular) {
    'use strict';
    angular.module('flightSearchModule').controller('flightSearchController', flightSearchController);
    flightSearchController.$inject = ['$http', 'constants', 'dataService', 'utilityServices', 'popupService'];

    function flightSearchController($http, constants, dataService, utilityServices, popupService) {
        var vm = this;
        vm.returnDate = "";
        var airport = [];
        vm.flightData = false;

        /********************Date configuration*********************/
        vm.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        vm.showButtonBar = false;
        vm.today = function () {
            vm.dt = new Date();
        };
        vm.today();
        vm.openOneWayDatepicker = function () {
            vm.oneWayDatepicker.opened = true;
        };

        vm.oneWayDatepicker = {
            opened: false
        };

        vm.openReturnWayDatepicker = function () {
            vm.returnWayDatepicker.opened = true;
        };

        vm.returnWayDatepicker = {
            opened: false
        };
        vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        vm.format = vm.formats[0];
        vm.clear = function () {
            vm.dt = null;
        };

        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        /************Data Services load**************/
        dataService.getAirports(constants.airportURL).then(function (airports) {;
            for (var i in airports) {
                airport.push(airports[i]);
            }
        })
        vm.airport = airport;
        vm.cities = constants;


        vm.flightOneWaySearch = function (data) {
            apiServiceCall(data);
        }

        function apiServiceCall(data) {
            var flightResults;
            var url = constants.flightFareURL;
            var flightData = data;
            if (data.origin.iata === data.destination.iata) {
                openPopup('Error', 'Source and destination cant be same');
                return;
            }
            var parameters = {
                source: data.origin.iata,
                destination: data.destination.iata,
                date: data.oneway.date
            }

            dataService.getFareList(parameters, url).then(function (response) {
                var responseObject = response.data;
                vm.flightData = responseObject.flight_data;
                calculateMinMaxPrice(responseObject.flight_data);
            }, function (error) {
                vm.errorMsg = error.data.error.message;
            });
        }


        /*****************Utility functions********************/
        function calculateMinMaxPrice(data) {
            vm.maxVal = Math.max.apply(null, utilityServices.calculateMaxPrice(data));
            vm.minVal = Math.min.apply(null, utilityServices.calculateMaxPrice(data));
        }

        function breadcrumb(data) {
            if (data[0].return) {
                vm.fromCity = data[0].return.from;
                vm.toCity = data[0].return.to;
                vm.returnCity = data[0].return.from;
            }
        }

        function openPopup(title, bodyMsg) {
            popupService.openPopup(title, bodyMsg);

        }; // end of scope.open function


    }
})(angular)