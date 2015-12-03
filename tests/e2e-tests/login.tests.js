describe('Clicking on the login button', function() {
    var username, password, loginButton;

    beforeEach(function() {
        browser.get('/#/login');
        username = element(by.model('username'));
        password = element(by.model('password'));
        loginButton = element(by.buttonText('Log in'));
    });

    it('should validate the credentials for a successful login and display the My Dinners view', function() {
        username.sendKeys('yoyoyo');
        password.sendKeys('password');

        loginButton.click().then(function() {
            expect(browser.getLocationAbsUrl()).toMatch('/my-dinners');

            var dinners = element.all(by.repeater('dinner in dinners'));
            expect(dinners.count()).toEqual(25);
        });
    });

    it('should display a popup for an unsuccessful login', function() {
        username.sendKeys('yoyoyo');
        password.sendKeys('iforgot');

        loginButton.click().then(function() {
            expect(browser.getLocationAbsUrl()).toMatch('/login');

            var popup = element(by.css('.popup-container.popup-showing.active'));
            expect(popup.isDisplayed()).toBeTruthy();
        });
    });
});
