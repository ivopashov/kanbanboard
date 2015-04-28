app.controller('boardController', ['$scope', 'boardService', 'notificationService', '$modal', 'stringManipulationService',
    function ($scope, boardService, notificationService, $modal, stringManipulationService) {
        'use strict';

        //init
        $scope.allCards = {};
        $scope.allStatuses = [];
        $scope.trashedItems = [];
        $scope.filters = {
            Task: true, Bug: true, Story: true
        }

        //retrieve data
        boardService.allStatuses().then(function (statuses) {
            boardService.getAll().then(function (cards) {
                $scope.processCardsAndStatuses(statuses.data, cards.data);
            }, function (carderror) {
                notificationService.error(carderror.data.message);
            });
        }, function (statuserror) {
            notificationService.error(statuserror.data.message);
        });

        $scope.createNew = function () {
            $modal.open({
                templateUrl: '/App/templates/dialog/createNewCard.html',
                controller: 'boardController'
            }).result.then(function (vm) {
                boardService.createNew({ title: vm.title, type: vm.type.replace(/ /g, ''), status: vm.status.replace(/ /g, '') }).then(function (success) {
                    var status = stringManipulationService.firstLetterToLowerCase(success.data.status);
                    success.data.visibility = true;
                    $scope.allCards[status].push(success.data);
                    notificationService.success("The card was added succesfully");
                }, function (error) {
                    notificationService.error(error.data.message);
                });
            }, function (error) {
                notificationService.error(error.data.message);
            });
        }

        $scope.handleItemDrop = function (event) {
            var item = event.source.nodeScope.$modelValue;
            var newStatus = event.dest.nodesScope.$parent.$element[0].id;
            if (newStatus == 'trash') return;
            boardService.updateStatus({ id: item.id, newStatus: newStatus }).then(function (success) {
                notificationService.success("Item status updated successfully");
            }, function (error) {
                $scope.handleUnsuccessfullDrop(event);
                notificationService.error(error.data.message);
            });
        }

        $scope.handleUnsuccessfullDrop = function (event) {
            //go back to previous state
            var item = event.source.nodeScope.$modelValue;
            event.dest.nodesScope.$modelValue.splice(event.dest.index, 1);
            event.source.nodesScope.$modelValue.splice(event.source.index, 0, item);
        }

        $scope.processCardsAndStatuses = function (statuses, cards) {
            angular.forEach(statuses, function (val) {
                var statusLowerCaseFirstLetter = stringManipulationService.firstLetterToLowerCase(val);
                $scope.allStatuses.push({ statusCamelCase: statusLowerCaseFirstLetter, friendlyStatus: stringManipulationService.splitWordsFromCamelCase(val) });
                $scope[statusLowerCaseFirstLetter] = {
                    dropped: function (event) {
                        $scope.handleItemDrop(event);
                    }
                }

                //initialize the object of cards so that if no items correspond to a key 
                //an empty list is assigned instead of no list
                if (cards.hasOwnProperty(statusLowerCaseFirstLetter)) {
                    $scope.allCards[statusLowerCaseFirstLetter] = cards[statusLowerCaseFirstLetter];
                } else {
                    $scope.allCards[statusLowerCaseFirstLetter] = [];
                }
            });
            $scope.changeItemsVisibility($scope.allCards, true);
        }

        $scope.toggle = function (filter) {
            $scope.filters[filter] = !$scope.filters[filter];
            $scope.changeItemsVisibility($scope.allCards, $scope.filters[filter], filter);
        }

        $scope.changeItemsVisibility = function (obj, val, type) {
            for (var prop in obj) {
                if ($scope.allCards.hasOwnProperty(prop)) {
                    angular.forEach($scope.allCards[prop], function (item) {
                        if (angular.isDefined(type)) {
                            item.type == type ? item.visibility = val : item.visibility = item.visibility;
                        } else {
                            item.visibility = val;
                        }
                    });
                }
            }
        }

        $scope.recycleBin = {
            dropped: function (event) {
                $scope.handleItemDrop(event);
            }
        }
        
        $scope.recycleDeletedItems = function () {
            angular.forEach($scope.trashedItems, function (val) {
                boardService.remove(val.id).then(function (success) {
                    var temp = $scope.trashedItems.filter(function (x) { return x.id == success.data })[0];
                    $scope.trashedItems.splice($scope.trashedItems.indexOf(temp),1);
                });
            });
        }
    }]);