app.factory('notificationService', [function () {
    'use strict';

    toastr.options = {
        closeButton: true,
        debug: false,
        onclick: null,
        positionClass: "text-left container",
        target: "#notification",
        showDuration: "300",
        hideDuration: "1000",
        timeOut: "0",
        extendedTimeOut: "0",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
        tapToDismiss: true,
        newestOnTop: true
    };

    return {
        success: function (text) {
            toastr.success(text, "Success. ");
        },
        error: function (text) {
            toastr.error(text, "Alert. ");
        },
        info: function (text) {
            toastr.info(text, "Success. ");
        },
        warning: function (text) {
            toastr.warning(text, "Warning. ");
        }

    };
}]);
