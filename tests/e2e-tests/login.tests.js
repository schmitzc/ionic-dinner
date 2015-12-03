describe('Clicking on the login button', function() {
    var mock = require('protractor-http-mock');

    var username, password, loginButton;

    var login = function() {
        browser.get('/#/login');
        username = element(by.model('username'));
        password = element(by.model('password'));
        loginButton = element(by.buttonText('Log in'));
    };

    var mockLoginRequest = function(statusCode) {
        mock([{
            request: {
                path: 'https://demo5062986.mockable.io/authenticate',
                method: 'POST'
            },
            response: {
                status: statusCode
            }
        }]);
    };

    afterEach(function() {
        mock.teardown();
    });

    it('should validate the credentials for a successful login and display the My Dinners view', function() {
        mockLoginRequest(200);

        login();

        username.sendKeys('yoyoyo');
        password.sendKeys('password');

        loginButton.click().then(function() {
            expect(browser.getLocationAbsUrl()).toMatch('/my-dinners');

            var dinners = element.all(by.repeater('dinner in dinners'));
            expect(dinners.count()).toEqual(25);
        });
    });

    it('should display a popup for an unsuccessful login', function() {
        mockLoginRequest(401);

        login();

        username.sendKeys('yoyoyo');
        password.sendKeys('iforgot');

        loginButton.click().then(function() {
            expect(browser.getLocationAbsUrl()).toMatch('/login');

            var popup = element(by.css('.popup-container.popup-showing.active'));
            expect(popup.isDisplayed()).toBeTruthy();
        });
    });
});
