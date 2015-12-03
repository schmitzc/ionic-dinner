angular.module('app.controllers', [])

.controller('loginCtrl', function($scope, $ionicPopup, $state, Dinners) {
    $scope.doLogin = function() {
        var onSuccess = function() {
            $state.go('my-dinners');
        };

        var onError = function() {
            $ionicPopup.alert({
                title: 'Login failed :(',
                template: 'Please try again'
            });
        };

        Dinners.login(this.username, this.password)
            .then(onSuccess, onError);
    };
})

.controller('myDinnersCtrl', function($scope, Dinners) {
    $scope.dinners = [];

    Dinners.getMyDinners().then(
        function (dinners) {
            $scope.dinners = dinners;
        });
})
