var Constants;
(function (Constants) {
    'use strict';
    Constants.Paths = {
        Core: 'core',
        Modules: 'modules/',
        Tabs: 'tabs',
        Side: {
            Base: 'side',
            Left: 'left'
        },
        Home: {
            Base: 'home',
            Edit: 'editStocks'
        },
        Actions: {
            Base: 'actions'
        },
        Buttons: {
            Base: 'buttons'
        }
    };
})(Constants || (Constants = {}));
;
/// <reference path="constants/paths.ts" />
var App;
(function (App) {
    'use strict';
    angular
        .module('app', [
        'ionic',
        Constants.Paths.Core,
        Constants.Paths.Tabs,
        Constants.Paths.Side.Base,
        Constants.Paths.Home.Base,
        Constants.Paths.Actions.Base,
        Constants.Paths.Buttons.Base,
    ])
        .config(statesConfiguration);
    window['ionic'].Platform.ready(function () {
        angular.bootstrap(document.querySelector('body'), ['app']);
    });
    // Configure routes
    function statesConfiguration($urlRouterProvider, $ionicConfigProvider, $stateProvider) {
        $ionicConfigProvider.scrolling.jsScrolling(false);
        $stateProvider
          .state('signin', {
              url: '/sign-in',
              templateUrl: Constants.Paths.Modules + 'login/views/login.html',
              controller: 'homeController as vm'
          })
            .state('register', {
                url: '/register',
                templateUrl: Constants.Paths.Modules + 'login/views/register.html',
                controller: 'homeController as vm'
        });

        //$urlRouterProvider.otherwise('/tabs/home');
        $urlRouterProvider.otherwise('/sign-in');
    }
    statesConfiguration.$inject = ["$urlRouterProvider", "$ionicConfigProvider", "$stateProvider"];
})(App || (App = {}));

var Actions;
(function (Actions) {
    'use strict';
    var Paths = Constants.Paths;
    var Page = Paths.Actions;
    angular.module(Page.Base, [])
        .config(statesConfiguration);
    function statesConfiguration($stateProvider) {
        $stateProvider
            .state(Paths.Tabs + '.' + Page.Base, {
            url: '/' + Page.Base,
            views: {
                'actions-tab': {
                    controller: 'actionsController as vm',
                    templateUrl: Paths.Modules + 'actions/views/actions.html'
                }
            }
        });
    }
    statesConfiguration.$inject = ["$stateProvider"];
})(Actions || (Actions = {}));

var Actions;
(function (Actions) {
    'use strict';
    var ActionsController = (function () {
        function ActionsController($state, $http, $scope) {
            this.$state = $state;
            this.$http = $http;
            this.$scope = $scope;
            this.userStocks = [];
            this.userId = '(not selected)';
            this.addTicker = ''; 
            this.addAmountOwned = '';
            this.addBuyPrice = '';
            this.addSellPrice = '';

            // this works. for doing a page reload
            $scope.$on('$ionicView.enter', function () {
                if (isRipple()) {
                    var user = { userId: "TestUser1" };
                    // remember to use this below too
                    //getUserFromWebService(user, $http, this.userStocks);
                    getUserFromWebService(user, $scope.vm);
                }
                // Get user info first I need to read user info

                readTokenFile(getUserStocks, $scope.vm, "token.txt");
                // console.log("init function()");
            });            
        }


        ActionsController.prototype.navigateToStockEditTab = function () {
            this.$state.go('tabs.buttons');
        };

        ActionsController.prototype.addStock = function () {
            // Post everything
            readTokenFile(postUserFromWebService, this, "token.txt");
        };

        ActionsController.prototype.refreshView = function () {
            this.$scope.vm.userStocks = [];
            readTokenFile(getUserStocks, this.$scope.vm, "token.txt");

            return;
        };

        ActionsController.$inject = ["$state", "$http", "$scope"];
        
        return ActionsController;
    })();
    Actions.ActionsController = ActionsController;
    angular.module(Constants.Paths.Actions.Base)
        .controller('actionsController', ActionsController);
})(Actions || (Actions = {}));

var Home;
(function (Home) {
    'use strict';
    var Paths = Constants.Paths;
    var Page = Paths.Home;
    angular.module(Page.Base, [])
        .config(statesConfiguration);
    function statesConfiguration($stateProvider) {
        $stateProvider
            .state(Paths.Tabs + '.' + Page.Base, {
                url: '/' + Page.Base,
                views: {
                    'home-tab': {
                        controller: 'homeController as vm',
                        templateUrl: Paths.Modules + 'home/views/home.html'
                    }
                }
            })
            .state(Paths.Tabs + '.' + Page.Edit, {
                url: '/' + Page.Edit,
                views: {
                    'actions-tab': {
                        //templateUrl: Paths.Modules + 'home/views/editStocks.html'
                        controller: 'actionsController as vm',
                        templateUrl: Paths.Modules + 'actions/views/actions.html'
                    }
                }
            });
    }
    statesConfiguration.$inject = ["$stateProvider"];
})(Home || (Home = {}));

var Home;
(function (Home) {
    'use strict';
    var HomeController = (function () {
        function HomeController($state, $http, $scope) {
            this.$state = $state;
            this.$scope = $scope;
            this.$http = $http;
            this.userId = '';
            this.email = '';
            this.firstName = '';
            this.lastName = '';
            this.emailWarning = '';
            this.requiredWarning = '';
            this.password = '';
            this.userIdSignOn = '';
            this.passwordSignOn = '';

            $scope.$on('$ionicView.enter', function () {
                if (isRipple()) {
                    var user = { userId: "TestUser1" };
                    // remember to use this below too
                    //getUserFromWebService(user, $http, this.userStocks);
                    // getUserFromWebService(user, $scope.vm);
                }
                // Get user info first I need to read user info

                // TODO - need to check this on app open
                readTokenFile(getUserStocks, $scope.vm, "token.txt");
                // console.log("init function()");
            });  
        }

        // TODO need to put this behavior after pressing sign in.
        HomeController.prototype.navigateToStockViewTab = function () {
            var _this = this;

            _this.requiredWarning = '';
            if (_this.userId == '' || typeof (_this.email) == "undefined" || _this.email == '' || _this.firstName == '' || _this.lastName == '') {
                _this.requiredWarning = 'All fields are required to change user';
                return;
            }

            var saveObj = {
                userId: this.userId,
                email: this.email,
                firstName: this.firstName,
                lastName: this.lastName
            };

            // Add a callback function here to redirect
            writeToFile(saveObj, _this.$state);
        };

        HomeController.prototype.validateEmail = function () {
            var _this = this;
            if (typeof(_this.email) == "undefined") {
                _this.emailWarning = "*Email Invalid";
            }
            else
            {
                _this.emailWarning = "";
            }
        };

        HomeController.prototype.signIn = function () {
            var _this = this;
            console.log("in the sign in method");

            var user = { userId: _this.userIdSignOn, password: _this.passwordSignOn };

            // TODO - check if token file already exists with a valid token in it

            postUserLogin(user, this.$scope.vm, this.$state);

            // Save the user token to the database. save in post user login
            // writeTokenFile();

            // Move on to the actual application:
            // this.$state.go('tabs.home');
        };

        // HomeController.prototype.testRead = function () {
        //     console.log("this is the test read method.");
        //     readTokenFile(function(){}, this.$scope.vm, "token.txt");
        // }; 

        HomeController.prototype.goRegister = function () {
            this.userIdSignOn = "";
            this.passwordSignOn = "";

            this.$state.go('register');
        };

        HomeController.prototype.registerUser = function () {
            console.log("in the register method");

            var user = {
                userId: this.userId,
                password: this.password,
                email: this.email,
                firstName: this.firstName,
                lastName: this.lastName
            };

            // This redirects to the login page after registration
            putUserRegistration(user, this.$scope.vm, this.$state);
        };

        HomeController.prototype.saveChanges = function () {
            var _this = this;

            // TODO
            readTokenFile(postUserFromWebService, _this, "token.txt");

            return;
        };

        HomeController.prototype.refreshView = function () {
            this.$scope.vm.userStocks = [];
            readTokenFile(getUserStocks, this.$scope.vm, "token.txt");

            return;
        };

        HomeController.$inject = ["$state", "$http", "$scope"];

        return HomeController;
    })();
    Home.HomeController = HomeController;
    angular.module(Constants.Paths.Actions.Base)
        .controller('homeController', HomeController);
})(Home || (Home = {}));

var Buttons;
(function (Buttons) {
    'use strict';
    var Paths = Constants.Paths;
    var Page = Paths.Buttons;
    angular.module(Page.Base, [])
        .config(statesConfiguration);
    function statesConfiguration($stateProvider) {
        $stateProvider
            .state(Paths.Tabs + '.' + Page.Base, {
            url: '/' + Page.Base,
            views: {
                'buttons-tab': {
                    controller: 'buttonsController as vm',
                    templateUrl: Paths.Modules + 'buttons/views/buttons.html'
                }
            }
        });
    }
    statesConfiguration.$inject = ["$stateProvider"];
})(Buttons || (Buttons = {}));

var Buttons;
(function (Buttons) {
    'use strict';
    var ButtonsController = (function () {
        function ButtonsController($state, $http, $scope) {
            this.$state = $state;
            this.$http = $http;
            this.$scope = $scope;
            this.userStocks = [];
            this.userId = '(not selected)';
            this.email = '';
            this.firstName = '';
            this.lastName = '';
            this.stockToDelete = '';

            // Execute on every page reload
            $scope.$on('$ionicView.enter', function () {
                readTokenFile(getUserStocks, $scope.vm, "token.txt");
            });

            this.text1 = '';
        }

        ButtonsController.prototype.saveChanges = function () {
            var _this = this;

            // Set up dummy data for ripple emulator only
            if (isRipple()) {
                _this.email = 'TEST1@TEST.com';
                _this.firstName = 'Test';
                _this.lastName = 'T';

                // call post directly
            }
            readFromFile(postUserFromWebService, _this);

            return;
        };

        ButtonsController.prototype.deleteAlert = function (userStock) {
            this.stockToDelete = userStock.stockTickerSymbol;
            readTokenFile(deleteUserStock, this.$scope.vm, "token.txt");
            return;
        };

        return ButtonsController;
    })();
    Buttons.ButtonsController = ButtonsController;
    angular.module(Constants.Paths.Buttons.Base)
        .controller('buttonsController', ButtonsController);
})(Buttons || (Buttons = {}));

var Core;
(function (Core) {
    'use strict';
    angular.module(Constants.Paths.Core, []);
})(Core || (Core = {}));

var Side;
(function (Side) {
    'use strict';
    var Paths = Constants.Paths;
    var Page = Paths.Side;
    angular.module(Page.Base, [])
        .config(statesConfiguration);
    function statesConfiguration($stateProvider) {
        $stateProvider
            .state(Paths.Tabs + '.' + Page.Left, {
            url: '/' + Page.Left,
            views: {
                'left-tab': {
                    templateUrl: Paths.Modules + 'side/views/left.html'
                }
            }
        });
    }
    statesConfiguration.$inject = ["$stateProvider"];
})(Side || (Side = {}));

var Tabs;
(function (Tabs) {
    'use strict';
    var Paths = Constants.Paths;
    angular.module(Paths.Tabs, [])
        .config(statesConfiguration);
    function statesConfiguration($stateProvider) {
        $stateProvider
            .state(Paths.Tabs, {
            url: '/' + Paths.Tabs,
            abstract: true,
            templateUrl: Paths.Modules + 'tabs/templates/tabs.html'
        });
    }
    statesConfiguration.$inject = ["$stateProvider"];
})(Tabs || (Tabs = {}));

var Core;
(function (Core) {
    'use strict';
})(Core || (Core = {}));

var Tabs;
(function (Tabs) {
    'use strict';
    var NavigationController = (function () {
        function NavigationController($ionicHistory, $ionicTabsDelegate, $ionicPlatform) {
            var _this = this;
            this.$ionicHistory = $ionicHistory;
            this.$ionicTabsDelegate = $ionicTabsDelegate;
            this.$ionicPlatform = $ionicPlatform;
            $ionicPlatform.registerBackButtonAction(function (e) { return _this.checkBack(e); }, 100);
        }
        NavigationController.$inject = ["$ionicHistory", "$ionicTabsDelegate", "$ionicPlatform"];
        NavigationController.prototype.goBack = function () {
            this.$ionicHistory.goBack();
        };
        NavigationController.prototype.checkBack = function (e) {
            var page = this.$ionicHistory.currentStateName();
            if (page === Constants.Paths.Home.Base) {
                var nav = navigator;
                if (nav.app && nav.app.exitApp) {
                    nav.app.exitApp();
                }
                else {
                    window.close();
                }
            }
            else {
                this.goBack();
            }
        };
        NavigationController.prototype.disableSwipe = function (e) {
            // For example on <ion-list>
            e.stopPropagation();
        };
        NavigationController.prototype.onSwipeLeft = function () {
            this.$ionicTabsDelegate.select(this.$ionicTabsDelegate.selectedIndex() + 1);
        };
        NavigationController.prototype.onSwipeRight = function () {
            var index = this.$ionicTabsDelegate.selectedIndex();
            if (index > 0) {
                this.$ionicTabsDelegate.select(this.$ionicTabsDelegate.selectedIndex() - 1);
            }
        };
        return NavigationController;
    })();
    Tabs.NavigationController = NavigationController;
    angular.module(Constants.Paths.Tabs)
        .controller('navigationController', NavigationController);
})(Tabs || (Tabs = {}));

function writeToFile(data, state, fileName) {
    if (isRipple()) {
        console.log("Running from Ripple. Cannot write to file.");
        state.go('tabs.actions');
        return;
    }

    if (typeof(fileName) === "undefined") {
        var fileName = 'storage.txt';
    }

    data = JSON.stringify(data, null, '\t');
    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (directoryEntry) {
        directoryEntry.getFile(fileName, { create: true }, function (fileEntry) {
            fileEntry.createWriter(function (fileWriter) {
                fileWriter.onwriteend = function (e) {
                    // for real-world usage, you might consider passing a success callback
                    // Get JSON here then pass
                    console.log('Write of file "' + fileName + '"" completed.');
                };

                fileWriter.onerror = function (e) {
                    // you could hook this up with our global error handler, or pass in an error callback
                    console.log('Write failed: ' + e.toString());
                };

                var blob = new Blob([data], { type: 'text/plain' });
                fileWriter.write(blob);

                state.go('tabs.actions');
            }, errorHandler.bind(null, fileName));
        }, errorHandler.bind(null, fileName));
    }, errorHandler.bind(null, fileName));
}

function readFromFile(callBackFunction, scope, fileName) {
    if (isRipple()) {
        console.log("Running from Ripple. Cannot read from system file.");
        return;
    }

    if (typeof(fileName) === "undefined") {
        var fileName = 'storage.txt';
    }

    var pathToFile = cordova.file.dataDirectory + fileName;
    window.resolveLocalFileSystemURL(pathToFile, function (fileEntry) {
        fileEntry.file(function (file) {
            var reader = new FileReader();

            reader.onloadend = function (e) {
                callBackFunction(JSON.parse(this.result), scope);
                return JSON.parse(this.result);
            };

            reader.readAsText(file);
        }, errorHandler);
    }, errorHandler);
}

function getUserFromWebService(user, scope) {
    console.log(user.userId);
    var url = 'https://intense-ocean-3569.herokuapp.com/users/userid/' + user.userId;
    scope.$http.get(url)
    .success(function (data) {
        console.log("Successfully got user data");
        if (data.length >= 1 && data[0].stockAlerts.length > 0) {
            scope.userId = data[0].userId;
            scope.userStocks = [];
            data[0].stockAlerts.forEach(function (element) {
                scope.userStocks.push(element);
            });
        }
    })
    .error(function () {
        console.log("No user found");
    });
}

function getUserStocks(user, scope) {
    if (!user.token) {
        console.log("token is missing in get User stocks!!");
    }

    var req = { 
        method: 'GET',
        url: 'https://intense-ocean-3569.herokuapp.com/user',
        headers: { 'x-access-token': user.token },
    };

    scope.$http(req).then(function (data) {
            console.log("Successfully got user data");
            if (typeof(data)==='object' && data.data[0].stockAlerts.length > 0) {
                scope.userId = data.data[0].userId;
                scope.userStocks = [];
                data.data[0].stockAlerts.forEach(function (element) {
                    scope.userStocks.push(element);
                });
            }
        },
        function () {
            console.log("No user found");
        });
}

function deleteUserStock(user, scope) {
    if (!user.token) {
        console.log("token is missing in delete User stocks!!");
    }

    var req = { 
        method: 'DELETE',
        url: 'https://intense-ocean-3569.herokuapp.com/user/stock/' + scope.stockToDelete,
        headers: { 'x-access-token': user.token },
    };

    scope.$http(req).then(function (data) {
            console.log("delete successful");
            
            // Refreshes the delete page
            scope.userStocks = [];
            readTokenFile(getUserStocks, scope, "token.txt");
        },
        function () {
            console.log("No user found");
        });
}

function postUserFromWebService(user, scope) {

    var stockAlerts = [];
    scope.userStocks.forEach(function (element) {
        stockAlerts.push({ stockTickerSymbol: element.stockTickerSymbol.toUpperCase(), amountOwned: element.amountOwned, buyPrice: element.buyPrice, sellPrice: element.sellPrice });
    });

    if (typeof (scope.addTicker) != 'undefined') {
        stockAlerts.push({ stockTickerSymbol: scope.addTicker.toUpperCase(), amountOwned: scope.addAmountOwned, buyPrice: scope.addBuyPrice, sellPrice: scope.addSellPrice });
        scope.addTicker = ''; 
        scope.addAmountOwned = '';
        scope.addBuyPrice = '';
        scope.addSellPrice = '';
    }
    
    var dataToSend = JSON.stringify({ stockAlerts: stockAlerts });
    // Do a post call here with all the new information
    var url = 'https://intense-ocean-3569.herokuapp.com/user';

    scope.$http({
        url: url,
        method: "POST",
        data: dataToSend,
        headers: { 'Content-Type': 'application/json',  'x-access-token': user.token }
    }).success(function (data) {
        console.log("success");
    }).error(function (data) {
        console.log("failed");
    });
}

function postUserLogin(user, scope, state) {
    var dataToSend = JSON.stringify(user);
    var url = 'https://intense-ocean-3569.herokuapp.com/login';  // TODO use the heroku server later

    scope.$http({
        url: url,
        method: "POST",
        data: dataToSend,
        headers: { 'Content-Type': 'application/json' }
    }).success(function (data) {
        console.log("success");
        console.log(data.token);
        if (data.success == false) {
            var saveObj = { token: "" };
        }
        else {
            var saveObj = { token: data.token };
        }
        
        writeTokenFile(saveObj, state, "token.txt");
    }).error(function (data) {
        console.log("failed");
    });
}

function writeTokenFile(data, state, fileName) {
    if (isRipple()) {
        console.log("Running from Ripple. Cannot write to file.");
        return;
    }

    data = JSON.stringify(data, null, '\t');
    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (directoryEntry) {
        directoryEntry.getFile(fileName, { create: true }, function (fileEntry) {
            fileEntry.createWriter(function (fileWriter) {
                fileWriter.onwriteend = function (e) {
                    // for real-world usage, you might consider passing a success callback
                    // Get JSON here then pass
                    console.log('Write of file "' + fileName + '"" completed.');
                };

                fileWriter.onerror = function (e) {
                    // you could hook this up with our global error handler, or pass in an error callback
                    console.log('Write failed: ' + e.toString());
                };

                var blob = new Blob([data], { type: 'text/plain' });
                fileWriter.write(blob);

                state.go('tabs.home');
            }, errorHandler.bind(null, fileName));
        }, errorHandler.bind(null, fileName));
    }, errorHandler.bind(null, fileName));
}

function readTokenFile(callBackFunction, scope, fileName) {
    if (isRipple()) {
        console.log("Running from Ripple. Cannot read from system file.");
        return;
    }

    var pathToFile = cordova.file.dataDirectory + fileName;
    window.resolveLocalFileSystemURL(pathToFile, function (fileEntry) {
        fileEntry.file(function (file) {
            var reader = new FileReader();

            reader.onloadend = function (e) {
                console.log(this.result);
                callBackFunction(JSON.parse(this.result), scope);
                return JSON.parse(this.result);
            };

            reader.readAsText(file);
        }, errorHandler);
    }, errorHandler);
}

function putUserRegistration(user, scope, state) {
    var dataToSend = JSON.stringify(user);
    var url = 'https://intense-ocean-3569.herokuapp.com/register';  // TODO use the heroku server later

    scope.$http({
        url: url,
        method: "PUT",
        data: dataToSend,
        headers: { 'Content-Type': 'application/json' }
    }).success(function (data) {
        console.log("success");
        state.go('signin');
    }).error(function (data) {
        console.log("failed");
    });
}

// This error handler is used for the write/read file
var errorHandler = function (fileName, e) {
    var msg = '';

    switch (e.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
            msg = 'Storage quota exceeded';
            break;
        case FileError.NOT_FOUND_ERR:
            msg = 'File not found';
            break;
        case FileError.SECURITY_ERR:
            msg = 'Security error';
            break;
        case FileError.INVALID_MODIFICATION_ERR:
            msg = 'Invalid modification';
            break;
        case FileError.INVALID_STATE_ERR:
            msg = 'Invalid state';
            break;
        default:
            msg = 'Unknown error';
            break;
    };

    console.log('Error (' + fileName + '): ' + msg);
}

function isRipple() {
    return typeof (window.parent.ripple) === 'function';
}