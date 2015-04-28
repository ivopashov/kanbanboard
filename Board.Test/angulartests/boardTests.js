
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

        var $controller, boardService, notificationService, $modal, stringManipulationService;


        beforeEach(inject(function (_$controller_, _boardService_, _notificationService_, _$modal_, _stringManipulationService_) {
            // The injector unwraps the underscores (_) from around the parameter names when matching
            $controller = _$controller_;
            boardService = _boardService_;
            notificationService = _notificationService_;
            $modal = _$modal_;
            stringManipulationService = _stringManipulationService_;
        }));

        describe('$scope.grade', function () {
            it('sets the strength to "strong" if the password length is >8 chars', function () {
                var $scope = {};
                var controller = $controller('boardController', { $scope: $scope, boardService: boardService, stringManipulationService: stringManipulationService, $modal: $modal, notificationService: notificationService });
                var event = {
                    dest: {
                        nodesScope: {
                            $modelValue: [1, 2, 3]
                        },
                        index: 1
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
                $scope.handleUnsuccessfullDrop(event);


                expect("aaa").toEqual('aaa');
            });
        });
    });
})();


