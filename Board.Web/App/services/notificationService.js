app.factory('notificationService', [function () {
    'use strict';

    return {
        success: function (text) {
            toastr.success(text, "Success. ");
        },
        error: function (text) {
            toastr.error(text, "Alert. ");
        },
        info: function (text) {
            toastr.info(text, "Info. ");
        },
        warning: function (text) {
            toastr.warning(text, "Warning. ");
        }

    };
}]);
