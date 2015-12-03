describe('loginCtrl', function() {
  var controller,
    scope,
    ionicPopupMock,
    stateMock,
    deferredLogin,
    dinnersMock;

  beforeEach(module('app'));

  // disable template caching
  beforeEach(module(function($provide, $urlRouterProvider) {
    $provide.value('$ionicTemplateCache', function() {});
    $urlRouterProvider.deferIntercept();
  }));

  beforeEach(inject(function($controller, $q, $rootScope) {
    scope = $rootScope.$new();

    ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);

    stateMock = jasmine.createSpyObj('$state spy', ['go']);

    deferredLogin = $q.defer();

    dinnersMock = {
      login: jasmine.createSpy('login spy')
        .and.returnValue(deferredLogin.promise)
    };

    $controller('loginCtrl', {
      '$scope': scope,
      '$ionicPopup': ionicPopupMock,
      '$state': stateMock,
      'Dinners': dinnersMock
    });
  }));

  describe('#doLogin', function() {
    beforeEach(function () {
      scope.username = 'test1';
      scope.password = 'password1';
      scope.doLogin();
    });

    it('should call login on Dinners', function() {
      expect(dinnersMock.login).toHaveBeenCalledWith('test1', 'password1');
    });

    describe('when the login is executed', function() {
      it('should change state to my-dinners if successful', function() {
        deferredLogin.resolve();
        scope.$digest();

        expect(stateMock.go).toHaveBeenCalledWith('my-dinners');
      });

      it('should show a popup if unsuccessful', function() {
        deferredLogin.reject();
        scope.$digest();

        expect(ionicPopupMock.alert).toHaveBeenCalled();
      });
    });
  });
});
