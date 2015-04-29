
(function () {
    describe('stringManipulationService test', function () {
        describe('when I call stringManipulationService.firstLetterToLowerCase', function () {
            beforeEach(module('app'));
            it('returns first Letter toLower', inject(function (stringManipulationService) {
                expect(stringManipulationService.firstLetterToLowerCase("Abc")).toEqual("abc");
            }));
            it('returns first Letter toLower', inject(function (stringManipulationService) {
                expect(stringManipulationService.firstLetterToLowerCase("abc")).toEqual("abc");
            }));
            it('returns first Letter toLower', inject(function (stringManipulationService) {
                expect(stringManipulationService.firstLetterToLowerCase("aBC")).toEqual("aBC");
            }));

        });
    });

    describe('stringManipulationService test', function () {
        describe('when I call stringManipulationService.splitWordsFromCamelCase', function () {
            beforeEach(module('app'));

            it('proper split words from camelCase', inject(function (stringManipulationService) {
                expect(stringManipulationService.splitWordsFromCamelCase("camelCase")).toEqual("Camel Case");
            }));
            it('proper split words from camelCase', inject(function (stringManipulationService) {
                expect(stringManipulationService.splitWordsFromCamelCase("camelCaseTest")).toEqual("Camel Case Test");
            }));
        });
    });

    describe('boardController', function () {
        beforeEach(module('app'));

        var $controller;


        beforeEach(inject(function (_$controller_) {
            // The injector unwraps the underscores (_) from around the parameter names when matching
            $controller = _$controller_;
        }));

        describe('$scope.handleUnsuccessfuldrop', function () {
            it('remove the object from target and put it back in source', function () {
                //Arrange
                var $scope = {};
                var controller = $controller('boardController', { $scope: $scope });
                var event = {
                    dest: {
                        nodesScope: {
                            $modelValue: [1, 2, 3]
                        },
                        index: 0
                    },
                    source: {
                        nodesScope: {
                            $modelValue: [1, 2, 3]
                        },
                        nodeScope: {
                            $modelValue: 1
                        },
                        index: 0
                    }
                }
                //Act
                $scope.handleUnsuccessfullDrop(event);
                //Assert
                var temp = event.dest.nodesScope.$modelValue.filter(function (x) { return x == event.source.nodeScope.$modelValue })[0];
                expect(event.source.nodesScope.$modelValue.length).toEqual(4);
                expect(event.dest.nodesScope.$modelValue.length).toEqual(2);
                expect(temp).toBeUndefined();

            });
        });

        describe('$scope.processCardsAndStatuses', function () {
            it('cards of all statuses', function () {
                //Arrange
                var $scope = {};
                var controller = $controller('boardController', { $scope: $scope });
                var statuses = ["InProgress", "Done", "NotStarted"];
                var cards = {
                    done: [{ title: "bug 111", type: 'Bug' }],
                    inProgress: [{ title: "story 111", type: 'Story' }],
                    notStarted: [{ title: "task 111", type: 'Task' }],
                };
                //Act
                $scope.processCardsAndStatuses(statuses, cards);
                //Assert
                expect($scope.allStatuses.length).toEqual(3);
                expect($scope.allStatuses[0].statusCamelCase).toEqual('inProgress');
                expect($scope.allStatuses[0].friendlyStatus).toEqual('In Progress');
                expect($scope.allCards[$scope.allStatuses[0].statusCamelCase].length).toEqual(1);
                expect($scope.allCards[$scope.allStatuses[1].statusCamelCase].length).toEqual(1);
                expect($scope.allCards[$scope.allStatuses[2].statusCamelCase].length).toEqual(1);
                for (var prop in $scope.allCards) {
                    if ($scope.allCards.hasOwnProperty(prop)) {
                        angular.forEach($scope.allCards[prop], function (item) {
                            expect(item.visibility).toEqual(true);
                        });
                    }
                }

                angular.forEach($scope.allStatuses, function (item) {
                    expect($scope[item.statusCamelCase].dropped).toBeDefined();
                });

            });
        });

        describe('$scope.processCardsAndStatuses', function () {
            it('Cards of 2 statuses. Test if the third status is initialized in allCards with an empty set.', function () {
                //Arrange
                var $scope = {};
                var controller = $controller('boardController', { $scope: $scope });
                var statuses = ["InProgress", "Done", "NotStarted"];
                var cards = {
                    done: [{ title: "bug 111", type: 'Bug' }],
                    inProgress: [{ title: "story 111", type: 'Story' }],
                };
                //Act
                $scope.processCardsAndStatuses(statuses, cards);
                //Assert
                expect($scope.allCards[$scope.allStatuses[0].statusCamelCase].length).toEqual(1);
                expect($scope.allCards[$scope.allStatuses[1].statusCamelCase].length).toEqual(1);
                expect($scope.allCards[$scope.allStatuses[2].statusCamelCase]).toBeDefined();
                expect($scope.allCards[$scope.allStatuses[2].statusCamelCase].length).toEqual(0);
            });
        });

        describe('$scope.toggle', function () {
            it('Test if toggle works as expected', function () {
                //Arrange
                var $scope = {};
                var controller = $controller('boardController', { $scope: $scope });
                $scope.allCards = {
                    done: [{ title: "bug 111", type: 'Bug',visibility:true }],
                    inProgress: [{ title: "story 111", type: 'Story', visibility: true }],
                    notStarted: [{ title: "task 111", type: 'Task', visibility: true }]
                };

                //Act
                $scope.toggle('Bug');
                //Assert
                expect($scope.allCards.done[0].visibility).toEqual(false);
                expect($scope.allCards.inProgress[0].visibility).toEqual(true);
                expect($scope.allCards.notStarted[0].visibility).toEqual(true);
            });
        });
    });
})();


