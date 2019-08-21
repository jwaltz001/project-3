const app = angular.module('MyApp', []);
// app.config(function($httpProvider) {
//       //Enable cross domain calls
//       $httpProvider.defaults.useXDomain = true;
//       //Remove the header used to identify ajax call  that would prevent CORS from working
//       delete $httpProvider.defaults.headers.common['X-Requested-With'];
//   });
// app.config(['$httpProvider', function($httpProvider) {
//   $httpProvider.defaults.withCredentials = true;
// }])



app.controller('AppController', ['$http', function($http){
    const controller = this;
	this.date = new Date().getTime();
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
				controller.goApp();
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
                console.log("logged out reponse:", response);
                controller.loggedInUsername = null;
            },
            function(error){
                console.log(error);
            }
        );
    };

    this.goApp = function(){
        //console.log('getting user info');
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

    // this.findTownie = function(){
    //   $http({
    //       method:'GET',
    //       url:'/app'
    //   }).then((res) => {
    //     // init showForm to false;
    //     this.findTownie = false;
    //
    //     // init empty user object for our form
    //     $scope.user = {};
    //
    //     $scope.submitForm = function() {
    //       // logic when the form is submitted
    //       //...
    //
    //       // reset the user
    //       $scope.user = {};
    //
    //       // finally hide the form
    //       $scope.showForm = false;
    //     };
    //
    //   }
    // ]);
	/************************************
	 *     COMPANY/TOWNIE FUNCTIONS     *
	 *                                  *
	 ************************************/
	this.isCompanySelected = false;
	this.isFindTownieSelected = false;
	this.isAddTownieSelected = false;

	this.includePath = '';
		this.changeInclude = (path) => {
			this.includePath = 'partials/'+ path +'.html';
		}

	// this.includeNavPath = "";
	// this.changeNavInclude= (path) => {
	// 	this.includeNavPath = 'partials/partials/'+ path +'.html';
	// }
	this.createTownie = () => {
		//console.log(this.name);
		$http({
			method:'POST',
			url:'/business',
			data:{
				name: this.name,
				streetAddress: this.streetAddress,
				city: this.city,
				state: this.state,
				zipcode: this.zipcode,
				description: this.description,
				endorsements: 0,
				faves: 0
			}
		}).then((res) => {
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
			this.isCompanySelected = true;
			console.log("Edit enabled on showTownie", this.isEditEnabled);

			})
	}
	//this.isEditEnabled = true;
	//this.toggleEditTownieForm = () => {
		//this.isEditEnabled = !this.isEditEnabled;
	//}
	this.editTownie = (company) => {
		console.log("Edit Route 1 (id of company):", company._id);
		$http({
			method:'PUT',
			url:'/business/'+company._id,
			data:{
				name: this.editedName,
				streetAddress: this.editedStreetAddress,
				city: this.editedCity,
				state: this.editedState,
				zipcode: this.editedZipcode,
				description: this.editedDescription
			}
		}).then((res) => {
			console.log("Edit Route 3 (res.data of edited company):", res.data);
			this.editedName = res.data.name;
			this.editedStreetAddress = res.data.address;
			this.editedCity = res.data.city;
			this.editedState = res.data.state;
			this.editedZipcode = res.data.zipcode;
			this.editedDescription = res.data.description;
			//this.isEditEnabled = true;
			this.getTownies()
		})
	}

	this.deleteTownie = function(companyToShow) {
	  console.log("delet route" + companyToShow);
	  $http({
	    method: 'DELETE',
	    url: '/business/' + companyToShow._id
	  }).then((res) => {
	    console.log(res.data);
	    this.getTownies();
	    this.companyToShow = null;
	    this.isCompanySelected = false;
	  })
	}

	  this.back = () => {
	    this.isCompanySelected = false;
	    this.back = function () {
	      this.isCompanySelected = true;
	    }
	  }


  // this.reset = function () {
  //   this.searchBox = {state: allStatesList()};
  //   $('#searchBox\\.state').find('> option').each(function() {
  //      $(this).removeAttr('selected');
  //   });
  // };

	this.getTownies = () => {
		$http({
			method:'GET',
			url:'/business'
		}).then((res) => {
			this.companies = res.data;
			//console.log(this.companies);
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
	//need to stop same user from approving multiple times
	this.isApproved = false;
	this.approveRibbonHover = () => {
		this.isApprovedHover = !this.isApprovedHover;
	}
	this.approveRibbonSelect = (company) => {
		this.isApproved = true;
		$http({
			method: "PATCH",
			url: "/business/approve/" + company._id

		}).then((res) => {
			//console.log("endorsements", res.data);
			this.companyToShow = res.data;
		})
	}
	this.publishNewReview = (companyToShowId) => {
		console.log("review route 1 (company id):", companyToShowId);
		console.log("review route 1 (company id):", companyToShowId);
		$http({
			method: "PATCH",
			url: "/business/userreviews/" + companyToShowId,
			data: {
				rating: this.newRating,
				comments: this.newReview,
				date: this.date
			}
		}).then((res) => {
			console.log("review route 5 (.then -> returned townie from route):", res.data);
			this.companyToShow = res.data;
      		console.log("logging this" + this.companyToShow);
		})
	}

	this.searchYelp = () => {
		$http({
			method: "GET",
			url: "/yelp",
			data:{
				apiUrl:"https://api.yelp.com/v3/businesses/search?limit=10&term=" + this.yelpSearchName + "&location=" +this.yelpSearchCity + this.yelpSearchState,
				Authorization: "Bearer nSZt3_3hdEoT09d9VuVMUbkQUz7JIViAKxl_DLMSpwmuMkD6CWPhaOOA62rf5qExfj7q8pDw07FRfxQw3ibkR-PpIAMggNu4manvUY2af0dRP9sBJVU1SCmzSpRYXXYx"
		}
		}).then((res) => {
			console.log("yelp search return",res.data);
		})
	}
	this.getTownies();
	this.goApp();
 	//console.log("Edit enabled on page load:", this.isEditEnabled);
}]);
