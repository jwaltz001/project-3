const app = angular.module('MyApp', []);
app.controller('AuthController', ['$http', function($http){
    const controller = this;
    this.createUser = function(){
      console.log("1" + this.username);
      console.log("2" + this.password);
        $http({
            method:'POST',
            url:'/sessions/newuser',
            data:{
                username:this.username,
                password:this.password
            }
        }).then(
            function(response){
                controller.username = null;
                controller.password = null;
                console.log(response);
            },
            function(error){
                console.log(error);
            }
        );
    };

    this.logIn = function(){
        $http({
            method:'POST',
            url:'/sessions',
            data: {
                username:this.username,
                password:this.password
            }
        }).then(
            function(response){
                console.log("thisiansf" + response);
                controller.username = null;
                controller.password = null;
                controller.goApp();
            },
            function(error){
                console.log(error);
            }
        );
    };

    this.logOut = function(){
        $http({
            method:'DELETE',
            url:'/sessions'
        }).then(
            function(response){
                console.log(response);
                controller.loggedInUsername = null;
            },
            function(error){
                console.log(error);
            }
        );
    };

    this.goApp = function(){
        console.log('getting user info');
        $http({
            method:'GET',
            url:'/app'
        }).then(
            function(response){
                controller.loggedInUsername = response.data.username;
            },
            function(error){
                console.log(error);
            }
        );
    };
    }]);
