
(function(){

var app = angular.module('githubViewer');

var MainCtrlFunction = function MainCtrl($scope, github, $interval, $log, $anchorScroll, $location)
{
    var onUserComplete = function(data){
        $scope.user = data;
        github.getRepos($scope.user).then(onRepos, onError);
       
    };

    var onRepos = function (data) {
    	$scope.repos = data;
    	$location.hash("userDetails");
    	$anchorScroll();
    };

    var onError = function(reason){
    	$scope.error = "could not fetch the data";
    };

    var decrementCountdown = function () {
    	$scope.countdown -= 1;
    	if($scope.countdown < 1){
    		$scope.search($scope.username);
    	}
    };

    var countdownInterval = null;
    var startCountdown = function(){
    	countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
    }

    $scope.search = function(username){
    	$log.info("Searching for " + username);
    	github.getUser(username)
        	.then(onUserComplete, onError);
        if(countdownInterval){
        	$interval.cancel(countdownInterval);
        	$scope.countdown = null;
        }

    };

    $scope.username = 'angular';

    $scope.repoSortOrder = '+name';

    $scope.countdown = 5;
    startCountdown();
   
};

app.controller("MainCtrl", ["$scope", "github", "$interval", "$log", "$anchorScroll", "$location", MainCtrlFunction]);
/*app.controller('MainCtrl', function MainCtrl($scope, $http)
{
    var onUserComplete = function(response){
        $scope.user = response.data;
    };

    $http.get("https://api.github.com/users/amusinger")
        .then(onUserComplete);
});*/



app.controller('TestCtrl', function TestCtrl($scope){
	$scope.message = 'GitHub Viewer';
});

}());