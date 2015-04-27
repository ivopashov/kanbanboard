app.service('stringManipulationService', [function () {
    'use strict';
    return {
        splitWordsFromCamelCase: function (str) {
            return str
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, function (str) { return str.toUpperCase(); }).trim();
        },
        firstLetterToLowerCase : function (str) {
            return str.substr(0, 1).toLowerCase() + str.substr(1);
        }
    };
}]);
