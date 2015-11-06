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
        function ActionsController(loadingService) {
            this.loadingService = loadingService;
            this.text = '';
            this.addTextAsync();
        }
        ActionsController.$inject = ["loadingService"];
        ActionsController.prototype.addTextAsync = function () {
            var _this = this;
            this.loadingService.show();
            window.setTimeout(function () {
                _this.text += '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt lacinia augue vehicula molestie. Proin a dui dignissim, ornare nulla ut, venenatis nisi. Proin accumsan tortor purus, a venenatis augue vestibulum porta. In faucibus ligula eu metus tempor, a ornare enim finibus. Donec ullamcorper risus sem, quis laoreet mauris pharetra in. Vestibulum tempus ipsum eget dolor ornare auctor. Ut pulvinar ac nibh ac lobortis.</p>';
                _this.loadingService.hide();
            }, Math.floor(Math.random() * 3000));
        };
        return ActionsController;
    })();
    Actions.ActionsController = ActionsController;
    angular.module(Constants.Paths.Actions.Base)
        .controller('actionsController', ActionsController);
})(Actions || (Actions = {}));


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
                    templateUrl: Paths.Modules + 'home/views/home.html'
                }
            }
        })
            .state(Paths.Tabs + '.' + Page.Edit, {
                url: '/' + Page.Edit,
                views: {
                    'home-tab': {
                        templateUrl: Paths.Modules + 'home/views/editStocks.html'
                    }
                }
        });
    }
    statesConfiguration.$inject = ["$stateProvider"];
})(Home || (Home = {}));

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
