define([
'angular'
],function(angular){
    var user=angular.module('user',[]);

    user.service('crudUser',function($http,$state){
        var self=this;
        self.getAllUser=function(scope){
            $http({
                url:'/user',
                method:'GET'
            }).then(function(res){
                    scope.userData=res.data;
                });
        };
        self.saveUser=function(data){
            var id=data.id?data.id:0;
            $http({
                url:'/user/'+id,
                method:'PUT',
                data:data
            }).then(function(data){
                    if(data){
                        self.goHome();
                        alert('Saved Successfully');
                    }else{
                        alert('Error during saving!!!');
                    }
                });
        };
        self.removeUser=function(id,callback){
            $http({
                url:'/user/'+id,
                method:'DELETE'
            }).then(function(data){
                    if(data){
                        self.goHome();
                        callback();
                        alert('Deleted Successfully');
                    }else{
                        alert('Error during deleting!!!');
                    }
                });
        };
        self.clearUser=function(scope){
            if(confirm("Do you want to Clear ?")){
                scope.user={};
            }
        };

        self.goHome=function(){
            $state.go('user');
        };
    });
    user.controller('userMainCtrl',function($scope,$http,$state,crudUser){
        //$scope.user={};
        $scope.userData=[];

//        $scope.$watch(
//            function(scope){return scope.user;},
//            function(oldValue,newValue){$scope.user=newValue}
//        );

        $scope.editUser=function(data){
            $state.go('editUser',{id:data.id});
        };

        $scope.delUser=function(data){
            if(confirm("Do you want to Delete ?")){
                crudUser.removeUser(data.id,function(){
                    crudUser.getAllUser($scope);
                });
            }
        };

        crudUser.getAllUser($scope);
    });



    user.controller('userEditCtrl',function($scope,$http,$state,$stateParams,crudUser){
        $scope.user={};
        $scope.clearForm=function(){
//            console.log($scope.user);
            crudUser.clearUser($scope);
        };


        $scope.cancel=function(){
            crudUser.goHome();
        };

        $scope.save=function(){
//            console.log('save');
            crudUser.saveUser($scope.user);
        };
        var id=$stateParams.id;
        if(id){
            if(id!=0){
                $http({
                    url:'/user/'+id,
                    method:'GET'
                }).then(function(res){
                        $scope.user=res.data[0];
                    });
            }else{
                alert('Invalid');
                crudUser.goHome();
            }
        }
    });

    user.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouteProvider){
        $urlRouteProvider.otherwise('/user');
        $stateProvider
            .state('user',{
                url:'/user',
                views:{
                    'view1':{
                        templateUrl:'javascripts/user/user.html'
                    }
//                    'view2':{
//                        template:'USER'
//                    }
                }
            })
            .state('addUser',{
                url:'/user/add',
                views:{
                    'view1':{
                        templateUrl:'javascripts/user/adduser.html',
                        controller:'userEditCtrl'
                    }
                }
            }).state('editUser',{
                url:'/user/edit',
                params:{id:0},
                views:{
                    'view1':{
                        templateUrl:'javascripts/user/adduser.html',
                        controller:'userEditCtrl'
                    }
                }
            });
    }]);

    return user;
});