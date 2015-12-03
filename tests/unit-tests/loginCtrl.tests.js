describe('loginCtrl', function() {
  var controller,
    deferredLogin,
    dinnersMock,
    stateMock,
    ionicPopupMock;

  beforeEach(module('app'));

  describe('#doLogin', function() {
    beforeEach(inject(function($controller, $q, _$scope_) {
      deferredLogin = $q.defer();

      dinnersMock = {
        login: jasmine.createSpy('login spy')
          .and.returnValue(deferredLogin.promise)
      };

      stateMock = jasmine.createSpyObj('$state spy', ['go']);

      ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);

      controller = $controller('loginCtrl', {
        '$ionicPopup': ionicPopupMock,
        '$state': stateMock,
        'Dinners': dinnersMock,
        '$scope': _$scope_
      });
    }));

    it('should call login on Dinners', function() {
      expect(dinnersMock.login).toHaveBeenCalledWith('test1', 'password1');
    });
  });
});
