function App() {
    'use strict';

    function _checkLocalStorageSupport() {
        var mod = 'test';
        try {
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            return true;
        } catch (e) {
            console.log('local storage is not supported in this browser');
            return false;
        }
    }

    this.init = function() {
        if (_checkLocalStorageSupport()) {
            littleEye.subscriber = new Subscriber();
            littleEye.maximumAllowedSize = 6;
            littleEye.userDataManager = new UserDataManager();
            littleEye.userDataManager.getBrowserInfo();
            littleEye.serverFunctions = new ServerFunctions();
            littleEye.dataStorage = new DataStorage();
            littleEye.userActionListener = new UserActionListener();
            littleEye.userActionListener.listenToEvents();

            // Creates cookie for user and gets info about window resolution
            $(document).ready(function() {
                //on script start get screen size if it is not saved
                if (!localStorage.length || !localStorage.getItem('startScreen')) {
                    var startscreen = new CustomEvent('startscreen');
                    document.dispatchEvent(startscreen);
                }
                // Setting userID in cookies
                if (document.cookie.indexOf('userID') === -1) {
                    littleEye.subscriber.fireEvent('userIdNotFound',
                        document, 'test');
                }
            });
        }
    };
}

littleEye.app = new App();
littleEye.app.init();