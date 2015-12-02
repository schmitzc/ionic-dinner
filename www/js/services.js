angular.module('app.services', [])

.factory('Dinners', function($http, $q) {
    return {
        login: function(username, password) {
            var request = {
                method: 'POST',
                url: 'http://nerddinner.com/Account/Logon',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'UserName=' + username + '&Password=' + password + '&RememberMe=false'
            };

            return $http(request).then(function(response) {
                var deferrred = $q.defer();

                if (response.headers('x-xrds-location')) {
                    deferrred.resolve();
                } else {
                    deferrred.reject();
                }

                return deferrred.promise();
            });
        },

        getMyDinners: function() {
            var parseDinners = function() {
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
                url: 'http://nerddinner.com/dinners',
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
