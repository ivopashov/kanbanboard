
(function() {
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
})();


