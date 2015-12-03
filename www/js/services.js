angular.module('app.services', [])

.factory('Dinners', function($http, $q) {
    return {
        login: function(username, password) {
            var request = {
                method: 'POST',
                url: 'https://demo5062986.mockable.io/authenticate',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'username=' + username + '&password=' + password
            };

            return $http(request).then(function(response) {
                var deferred = $q.defer();

                if (response.status == 200) {
                    deferred.resolve();
                } else {
                    deferred.reject();
                }

                return deferred.promise;
            });
        },

        getMyDinners: function() {
            var parseDinners = function(response) {
                var tmp = document.implementation.createHTMLDocument();
                tmp.body.innerHTML = response.data;

                var items = tmp.body.getElementsByClassName('upcomingdinners')[0].children;

                var dinners = [];

                for (var i = 0; i < items.length; i++) {
                    var item = items[i];

                    var dinner = {
                        name: item.getElementsByTagName('a')[0].innerText,
                        date: item.getElementsByTagName('strong')[0].innerText,
                        location: item.innerText.split('at')[1]
                    };

                    dinners.push(dinner);
                }

                return dinners;
            }

            var request = {
                method: 'GET',
                url: 'https://demo5062986.mockable.io/dinners',
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            };

            return $http(request)
                .then(function(response) {
                    return parseDinners(response);
                });
        }
    };
});
