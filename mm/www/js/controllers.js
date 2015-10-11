angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, SessionService, $http,$ionicPopup,$state) {
  if (SessionService.emailid == '') {
    $state.go('login')
  };
$scope.data = {};
      var data={
        'emailid': SessionService.emailid
      };
    $http.get("http://192.168.113.182:8080/dashboard",{params: {emailid: data.emailid,resultstype: 'past'}})
    .success(function(res) {
      $scope.pastData=angular.fromJson(res);
      console.log($scope.pastData);
    }).error(function(){
            var alertPopup = $ionicPopup.alert({
                title: 'account retrival failed!',
                template: 'Please check your credentials!'
            });
    });
    $http.get("http://192.168.113.182:8080/dashboard",{params: {emailid: data.emailid,resultstype: 'future'}})
    .success(function(res) {
      $scope.futureData=angular.fromJson(res);
      console.log($scope.futureData);
    }).error(function(){
            var alertPopup = $ionicPopup.alert({
                title: 'account retrival failed!',
                template: 'Please check your credentials!'
            });
    });

})


.controller('InterestsCtrl', function($scope,$state,SessionService,$http,$ionicPopup) {
  if (SessionService.emailid == '') {
    $state.go('login')
  };
  $scope.interestsList = ['Donations','Scholarships','Shop and Support','Mentoring','Volunteering','Other'];
  $scope.selectedInterests=[];
  $scope.done= function(){
    // console.log($scope.selectedInterests);
    var data = {
      'emailid': SessionService.emailid,
      'interests':$scope.selectedInterests
    };
    // console.log(data);
        $http.post("http://192.168.113.182:8080/userinterests",data).
    success(function(res) {
            $state.go('tab.dash');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
  };
  $scope.toggleSelection= function(interest){
    // console.log("changed");
    var idx = $scope.selectedInterests.indexOf(interest);
    if(idx > -1){
      $scope.selectedInterests.splice(idx, 1);
    }
    else{
      $scope.selectedInterests.push(interest);
    }
  };

})

.controller('EventsCtrl', function($scope, Events, SessionService, $http, $state) {
  if (SessionService.emailid == '') {
    $state.go('login')
  };
  $scope.events = Events.all();
  $http.get('http://192.168.113.182:8080/event/',{params: {emailid: SessionService.emailid}})
  .success(function(responce){
    $scope.events = angular.fromJson(responce);
    // console.log($scope.events)
  })
  $scope.remove = function(event){
    Events.remove(event);
  };
})


.controller('EventDetailCtrl', function($scope, $stateParams,$cordovaSocialSharing, $http, $state, SessionService) {
  if (SessionService.emailid == '') {
    $state.go('login')
  };
  $scope.eventid = $stateParams.eventid;
      // console.log($scope.eventid)
  $http.get('http://192.168.113.182:8080/event/' + $scope.eventid)
  .success(function(responce){
    $scope.event = angular.fromJson(responce[0]);
    // console.log($scope.event);

  })
  $scope.remove = function(event){
    Events.remove(event);
  };

  $scope.shareAnywhere = function() {
        $cordovaSocialSharing.share("This is your message", "This is your subject", "www/imagefile.png", "http://blog.nraboy.com");
    }
 
    $scope.shareViaTwitter = function(message, image, link) {
        $cordovaSocialSharing.canShareVia("twitter", message, image, link).then(function(result) {
            $cordovaSocialSharing.shareViaTwitter(message, image, link);
        }, function(error) {
            alert("Cannot share on Twitter");
        });
    }

})


.controller('AccountCtrl', function($scope,SessionService,$http, $ionicPopup, $state) {
  if (SessionService.emailid == '') {
    $state.go('login')
  };
$scope.data = {};
    
      var data={
        'emailid': SessionService.emailid
      };
    $http.get("http://192.168.113.182:8080/user",{params: {emailid: data.emailid}}).
    success(function(res) {
      $scope.res1=angular.fromJson(res[0]);
      // console.log($scope.res1);
    }).error(function(){
            var alertPopup = $ionicPopup.alert({
                title: 'account retrival failed!',
                template: 'Please check your credentials!'
            });
    });

})

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state,$http,SessionService){
    $scope.data = {};
    
    $scope.login = function() {
      var data={
        'emailid':$scope.data.username, 
        'password':$scope.data.password
      };
    $http.post("http://192.168.113.182:8080/login",data).
    success(function(res) {
          SessionService.emailid = $scope.data.username;
            $state.go('tab.dash');
        }).error(function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }

    $scope.signup = function() {
    $state.go('signup');
  }
})

.controller('SignupCtrl', function($scope,$state,$http,SessionService) {
  $scope.data = {};

  $scope.signup=function(){
    var data={
      'firstname':$scope.data.firstname,
      'lastname':$scope.data.lastname,
      'emailid':$scope.data.emailid,
      'phone':$scope.data.phone,
      'dob':$scope.data.dob,
      'addressline1':$scope.data.addressline1,
      'addressline2':$scope.data.addressline2,
      'city':$scope.data.city,
      'state':$scope.data.state,
      'zip':$scope.data.zip,
      'password':$scope.data.password
    };  
    // console.log(data); 
    $http.post("http://192.168.113.182:8080/user",data).
    success(function(res){
      // console.log(res);
      SessionService.emailid = $scope.data.emailid;
        $state.go("interests"); 
    }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Sign up failed!',
                template: 'Please enter your details properly!'
            });
        });
  }
  

})






