app.service('stringManipulationService', [function () {
    'use strict';
    return {
        splitWordsFromCamelCase: function (str) {
            var result= str
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, function (str) { return str.toUpperCase(); }).trim();
            return result;
        },
        firstLetterToLowerCase : function (str) {
            var result = str.substr(0, 1).toLowerCase() + str.substr(1);
            return result;
        }
    };
}]);
