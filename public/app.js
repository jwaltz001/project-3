const app = angular.module('MyApp', []);

app.controller('AppController', ['$http', function($http, SharedValues){
    const controller = this;
	// this.isActiveUser = () => {
	// 	if (loggedInUsername) {
	// 		return true
	// 	}else {
	// 		return false
	// 	}
	// }
	/********************************
	 * AUTHORIZATION/NAV FUNCTIONS  *
	 *                              *
	 ********************************/
	this.createUser = function(){
        $http({
            method:'POST',
            url:'/sessions/newuser',
            data:{
                username:this.newUsername,
                password:this.newPassword
            }
        }).then(
            function(response){
                controller.newUsername = null;
                controller.newPassword = null;
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
				isActiveUser = true;
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

	/************************************
	 *     COMPANY/TOWNIE FUNCTIONS     *
	 *                                  *
	 ************************************/
	this.createTownie = () => {
		console.log(this.name);
		$http({
			method:'POST',
			url:'/business',
			data:{
				name: this.name,
				city: this.city,
				state: this.state,
				description: this.description
			}
		}).then(() => {
			this.getTownies()
		})
	}

	this.getTownies = () => {
		$http({
			method:"GET",
			url:"/business"
		}).then((res) => {
			this.companies = res.data;
		});
	}

	this.getTownies();
}]);
