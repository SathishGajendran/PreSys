require.config({
//    baseUrl:'lib/components',
    paths:{
        'jQuery':'lib/components/jquery/dist/jquery.min',
        'angular':'lib/components/angularjs/angular.min',
        'angular-ui-route':'lib/components/angular-ui-router/release/angular-ui-router.min',
        'angular-bootstrap':'lib/components/angular-bootstrap/ui-bootstrap.min',
        'bootstrap':'lib/components/bootstrap/dist/js/bootstrap.min',
        'less':'lib/components/less/dist/less.min',
        'angular-loading-bar':'lib/components/angular-loading-bar/build/loading-bar.min'
    },
    shim:{
        'jQuery':{
            exports:'jQuery'
        },
        'angular':{
            exports:'angular'
        },
        'angular-ui-route':{
            deps:['angular'],
            exports:'angularUiRoute'
        },
        'angular-bootstrap':{
            deps:['angular'],
            exports:'angularBootstrap'
        },
        'bootstrap':{
            deps:['jQuery'],
            exports:'bootstrap'
        },
        'angular-loading-bar':{
            deps:['angular'],
            exports:'angularLoadingBar'
        }
    }
});
//window.name='NG_DEFER_BOOTSTRAP!';
require([
    'jQuery',
    'angular',
    'angular-ui-route',
    'angular-bootstrap',
    'bootstrap',
    'less',
    'angular-loading-bar',
    'javascripts/user/user'
],function(jQuery,angular,angularUiRoute,angularBootstrap,bootstrap,less,angularLoadingBar,user){
    document.getElementsByTagName('style')[0].remove();
    var theme1Link="stylesheets/theme1/theme1.less";
    var theme1=document.createElement('style');
    theme1.href=theme1Link;
    theme1.rel="stylesheet/less";
    theme1.type="text/css";
    theme1.id="theme1";
    less.sheets.pop();
    less.sheets.push(theme1);
    less.refresh();

    var app=angular.module('app',['ui.router','ui.bootstrap','angular-loading-bar','user']);

    app.config(['cfpLoadingBarProvider',function(cfpLoadingBarProvider){
        cfpLoadingBarProvider.includeSpinner=false;
    }]);
    app.controller('appCtrl',function($scope){
        $scope.test=" test";
    });
//    app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouteProvider){
//        $urlRouteProvider.otherwise('/');
//        $stateProvider
//            .state('home',{
//                url:'/',
//                views:{
//                    'view':{
//                        templateUrl:'javascripts/content.html'
//                    }
//                }
//            });
//    }]);

    angular.element(document).ready(function () {
        angular.bootstrap(document, ['app']);
    });
});