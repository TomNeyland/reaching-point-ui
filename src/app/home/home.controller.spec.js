'use strict';

describe('controllers', function(){
  var scope;

  beforeEach(module('baseangular'));

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should define more than 5 awesome things', inject(function($controller) {
    expect(scope.unitTestExample).toBeUndefined();

    $controller('HomeCtrl', {
      $scope: scope
    });

    //expect(User.get)

    expect(scope.unitTestExample === 'I am a lovely string').toBeTruthy();
    expect(scope.unitTestExample).toBe('I am a lovely string');
  }));
});
