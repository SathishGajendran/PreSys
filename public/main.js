require.config({
//    baseUrl:'lib/components',
    paths:{
        'jQuery':'lib/components/jquery/dist/jquery.min',
        'angular':'lib/components/angularjs/angular.min',
        'angular-ui-route':'lib/components/angular-ui-router/release/angular-ui-router.min',
        'angular-bootstrap':'lib/components/angular-bootstrap/ui-bootstrap.min',
        'bootstrap':'lib/components/bootstrap/dist/js/bootstrap.min',
        'less':'lib/components/less/dist/less.min'
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
    'javascripts/user/user'
],function(jQuery,angular,angularUiRoute,angularBootstrap,bootstrap,less,user){
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

    var app=angular.module('app',['ui.router','ui.bootstrap','user']);
    app.controller('appCtrl',function($scope){
        $scope.test=" test";
    });
    app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouteProvider){
        $urlRouteProvider.otherwise('/user');
        $stateProvider
            .state('user',{
                url:'/user',
                views:{
                    'view1':{
                        template:'USER'
                    },
                    'view2':{
                        templateUrl:'javascripts/user/user.html'
                    }
                }
            });
    }]);
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['app']);
    });
});