module.exports = (function() {
  var app = angular.module('app.activities-ctrl', []);

  app.controller('ActivtiesCtrl', ['$scope', '$http', 'RestService', function($scope, $http, RestService) {

    $scope.priceList = [{id: 'lowest,price', name: 'Lowest price'}, {id: 'highest,price', name: 'Highest price'}];
    $scope.ratingsList = [{id: 'lowest,ratings', name: 'Lowest ranking'}, {id: 'highest,ratings', name: 'Highest ranking'}];

    $http.get(RestService.getRESTUrl() + 'getCategoryList')
      .then(function(response) {
        if(response.data.status === 200 && response.data.success) {
          $scope.categories = [];
          var iconsArray = { MUSIC: 'icon-music-3', DANCE: 'icon-pitch', SOCCER: 'icon-soccer', SPORTS: 'icon-skiing', EDUCATION: 'icon-library', CRICKET: 'icon-cricket'};
          for(var i=0; i<response.data.categoryList.length; i++) {
            var obj = {};
            obj.categoryID = response.data.categoryList[i].categoryID;
            obj.iconClass = iconsArray[response.data.categoryList[i].categoryName.toUpperCase()];
            obj.categoryName = response.data.categoryList[i].categoryName;
            $scope.categories.push(obj);
          }
        }
      }, function(error) {
        console.log(error);
      });

      $http({method: 'GET', url: RestService.getRESTUrl() + 'getAllActivitiesForUser'})
        .then(function(response) {
          if(response.data.status === 200 && response.data.success) {
            $scope.count = response.data.count;
            $scope.showPagination = ($scope.count > 10) ? true : false;
            $scope.activities = response.data.activityList;
          }
        }, function(error) {
          console.log("Error in gettign activities for user: " + error);
        });

      $scope.getSelectedCategoryList = function(categoryID) {
        let url = (categoryID == 'all') ? RestService.getRESTUrl() + 'getAllActivitiesForUser' : RestService.getRESTUrl() + 'getActivitiesByCategory/' + categoryID;
        $http({method: 'GET', url: url})
          .then(function(response) {
            if(response.data.status === 200 && response.data.success) {
              $scope.count = response.data.count;
              $scope.showPagination = ($scope.count > 10) ? true : false;
              $scope.activities = response.data.activityList;
            }
          }, function(error) {
            console.log("Error in getting selected category activities list: " + error);
          });
        };

      $scope.sortList = function(selected) {
        var selectConfig = selected.id.split(',');
        $http({method: 'GET', url: RestService.getRESTUrl() + 'getSortedActivitiesList/' + selectConfig[1] + '/' + selectConfig[0]})
          .then(function(response) {
            if(response.data.status === 200 && response.data.success) {
              $scope.count = response.data.count;
              $scope.showPagination = ($scope.count > 10) ? true : false;
              $scope.activities = response.data.activityList;
            }
          }, function(errorResponse) {
            console.log("Error in fetching sorted records: " + errorResponse);
          });
      };
  }]);
}());
