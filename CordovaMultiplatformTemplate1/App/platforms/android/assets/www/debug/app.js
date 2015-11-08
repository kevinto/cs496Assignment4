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
        Constants.Paths.Buttons.Base
    ])
        .config(statesConfiguration);
    window['ionic'].Platform.ready(function () {
        angular.bootstrap(document.querySelector('body'), ['app']);
    });
    // Configure routes
    function statesConfiguration($urlRouterProvider, $ionicConfigProvider) {
        $ionicConfigProvider.scrolling.jsScrolling(false);
        $urlRouterProvider.otherwise('/tabs/home');
    }
    statesConfiguration.$inject = ["$urlRouterProvider", "$ionicConfigProvider"];
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
            // Add method here to test on init page

            // this works. for doing a page reload
            $scope.$on('$ionicView.enter', function () {
                // Get user info first I need to read user info
                readFromFile(getUserFromWebService, $http);
                console.log("init function()");
            });
            this.userId = '';
            this.email = '';
            this.firstName = '';
            this.lastName = '';
        }

        ActionsController.$inject = ["$state", "$http", "$scope"];
        ActionsController.prototype.navigateToStockViewTab = function () {
            var _this = this;

            //_this.$state.go('tabs.actions', {}, {location: false, reload: true});

            // Add code here to make a GET all to populate the next page
            // Need to figure out a way to put data into view stocks
            //_this.$http.get('https://intense-ocean-3569.herokuapp.com/users/')
            //.success(function (data) {
            //    console.log(data);
            //})
            //.error(function () {
            //    alert("Not working");
            //});

            return;
        };

        // Add method here to test the read portion
        ActionsController.prototype.readUserInfo = function () {
            var _this = this;

            // Test read
            readFromFile(getUserFromWebService);
            return;
        };

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
        function HomeController($state) {
            this.$state = $state;
            this.userId = '';
            this.email = '';
            this.firstName = '';
            this.lastName = '';
        }

        HomeController.$inject = ["$state"];
        HomeController.prototype.navigateToStockViewTab = function () {
            var _this = this;

            // Add code here to save the entered information to file
            // Get the form data first - DONE. this is in the scope variable
            var saveObj = {
                userId: this.userId,
                email: this.email,
                firstName: this.firstName,
                lastname: this.lastName
            };      

            // Add a callback function here to redirect
            writeToFile(saveObj, _this.$state);
        };

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
                    templateUrl: Paths.Modules + 'buttons/views/buttons.html'
                }
            }
        });
    }
    statesConfiguration.$inject = ["$stateProvider"];
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

var Core;
(function (Core) {
    'using strict';
    var LoadingService = (function () {
        function LoadingService($ionicLoading) {
            this.$ionicLoading = $ionicLoading;
        }
        LoadingService.$inject = ["$ionicLoading"];
        LoadingService.prototype.show = function () {
            var options = {
                templateUrl: Constants.Paths.Modules + 'tabs/templates/loading.html'
            };
            this.$ionicLoading.show(options);
        };
        LoadingService.prototype.hide = function () {
            this.$ionicLoading.hide();
        };
        return LoadingService;
    })();
    Core.LoadingService = LoadingService;
    angular.module(Constants.Paths.Core)
        .service('loadingService', LoadingService);
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

function writeToFile(data, state) {
    if (isRipple()) {
        console.log("Running from Ripple. Cannot write to file.");
        state.go('tabs.actions');
        return;
    }
    var fileName = 'storage.txt';

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

function readFromFile(callBackFunction, httpService) {
    if (isRipple()) {
        console.log("Running from Ripple. Cannot read from system file.");
        return;
    }

    var fileName = 'storage.txt';
    var pathToFile = cordova.file.dataDirectory + fileName;
    window.resolveLocalFileSystemURL(pathToFile, function (fileEntry) {
        fileEntry.file(function (file) {
            var reader = new FileReader();

            reader.onloadend = function (e) {
                callBackFunction(JSON.parse(this.result), httpService);
                return JSON.parse(this.result);
            };

            reader.readAsText(file);
        }, errorHandler);
    }, errorHandler);
}

function getUserFromWebService(user, httpService) {
    console.log(user.userId);
    var url = 'https://intense-ocean-3569.herokuapp.com/users/userid/' + user.userId;
    httpService.get(url)
    .success(function (data) {
        console.log(data);
    })
    .error(function () {
        console.log("No user found");
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