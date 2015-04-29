app.service('cardService', ['$http', function ($http) {
    'use strict';

    return {
        getAll: function () {
            return $http.get('api/cards/getall');
        },
        updateStatus: function (vm) {
            return $http.post('api/cards/status', vm);
        },
        createNew: function (vm) {
            return $http.post('api/cards/create', vm);
        },
        allStatuses: function () {
            return $http.get('api/statuses/getall');
        },
        remove: function (id) {
            return $http.get('api/cards/remove?id=' + id);
        }
    };
}]);
