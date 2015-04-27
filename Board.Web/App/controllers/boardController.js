app.controller('boardController', ['$scope', 'boardService', 'notificationService', '$modal',
    function ($scope, boardService, notificationService, $modal) {
        'use strict';

        $scope.allCards = [];
        $scope.allStatuses = [];

        boardService.getAll().then(function (success) {
            $scope.allCards = success.data;
        });

        boardService.allStatuses().then(function (success) {
            angular.forEach(success.data, function (val) {
                var statusLowerCaseFirstLetter = $scope.firstLetterToLowerCase(val);
                $scope.allStatuses.push({ statusCamelCase: statusLowerCaseFirstLetter, friendlyStatus: $scope.splitWordsFromCamelCase(val) });
                $scope[statusLowerCaseFirstLetter] = {
                    dropped: function (event) {
                        $scope.handleItemDrop(event);
                    }
                }
            })
        });

        $scope.createNew = function () {

            $modal.open({
                templateUrl: '/App/templates/dialog/createNewCard.html',
                controller: 'boardController',
            }).result.then(function (vm) {
                boardService.createNew({ title: vm.title, type: vm.type.replace(/ /g, ''), status: vm.status.replace(/ /g, '') }).then(function (success) {
                    var status = $scope.firstLetterToLowerCase(success.data.status);
                    $scope.allCards[status].push(success.data);
                    notificationService.success("The card was added succesfully");
                }, function (error) {
                    notificationService.error(error.data.message);
                })
            }, function (error) {

            });
        }

        $scope.handleItemDrop = function (event) {
            var item = event.source.nodeScope.$modelValue;
            var newStatus = event.dest.nodesScope.$parent.$element[0].id;
            boardService.updateStatus({ id: item.id, newStatus: newStatus }).then(function (success) {
                notificationService.success("Item status updated successfully");
            }, function (error) {
                event.dest.nodesScope.$modelValue.splice(event.dest.index, 1);
                event.source.nodesScope.$modelValue.splice(event.source.index, 0, item);
                notificationService.error("Could not update item's status");
            });
        }

        $scope.firstLetterToLowerCase = function (str) {
            return str.substr(0, 1).toLowerCase() + str.substr(1);
        }

        $scope.splitWordsFromCamelCase = function (str) {
            return str
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, function (str) { return str.toUpperCase(); }).trim();
        }
    }]);