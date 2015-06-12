define([
'angular'
],function(angular){
    var user=angular.module('user',[]);
    user.controller('userCtrl',function($scope){
        $scope.user="user test"
    });
    return user;
});