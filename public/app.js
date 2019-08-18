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
                console.log("Log In Response:",response.data);
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
				console.log("Username:", response.data.username);
				controller.loggedInUsername = response.data.username;
				console.log("loggedInUsername:", controller.loggedInUsername);
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
	this.isCompanySelected = false;
	this.searchForNewCompany = () => {
		console.log("works");
	}
	this.createTownie = () => {
		console.log(this.name);
		$http({
			method:'POST',
			url:'/business',
			data:{
				name: this.name,
				streetAddress: this.streetAddress,
				city: this.city,
				state: this.state,
				zipcode: this.zipcode,
				description: this.description
			}
		}).then(() => {
			this.name = null;
			this.streetAddress = null;
			this.city = null;
			this.state = null;
			this.zipcode = null;
			this.description = null;
			this.getTownies()
		})
	}

	this.showTownie = (townie) => {
		console.log("Townie to show 1 (click):", townie);
		$http({
			method: 'GET',
			url: '/business/' + townie._id
		}).then((res) => {
			console.log("Townie to show 3 (res):", res);
			this.companyToShow = res.data
			this.selectedCompanyAddress = res.data.streetAddress + ", " + res.data.city + ", " + res.data.state + " " + res.data.zipcode
			console.log(this.companyAddress);
			this.isCompanySelected = true;
			})
	}

	this.editTownie = (townieId) => {
		$http({
			method:'PUT',
			url:'/business/'+townieId,
			data:{
				name: this.name,
				streetAddress: this.streetAddress,
				city: this.city,
				state: this.state,
				zipcode: this.zipcode,
				description: this.description
			}
		}).then(() => {
			this.name = null;
			this.streetAddress = null;
			this.city = null;
			this.state = null;
			this.zipcode = null;
			this.description = null;
			this.getTownies()
		})
	}

	this.getTownies = () => {
		$http({
			method:'GET',
			url:'/business'
		}).then((res) => {
			this.companies = res.data;
			console.log(this.companies);
			this.allStatesList = () => {
				const statesList = []
				for (let i = 0; i < this.companies.length; i++) {
					statesList.push(this.companies[i].state);
				}
				const sortedStatesList = statesList.sort()
				const filteredStatesList = []
				for (var i = 0; i < sortedStatesList.length; i++) {
					if (sortedStatesList[i] != sortedStatesList[i+1]) {
						filteredStatesList.push(sortedStatesList[i])
					}
				}
				return filteredStatesList
			}
		});
	}

	this.getTownies();

}]);
