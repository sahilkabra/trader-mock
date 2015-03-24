var app = angular.module('TabModule', []);

app.controller('TabController', ['$scope', function($scope) {
  $scope.tabs = [{
    title: 'Options Trading',
    url: 'tab.url.options'
  }, {
    title: 'Orders',
    url: 'tab.url.orders'
  }, {
    title: 'Charts',
    url: 'tab.url.charts'
  }, {
    title: 'Account Summary',
    url: 'tab.url.account.summary'
  }, {
    title: 'Reports',
    url: 'tab.url.reports'
  }];

  var currentTab = 'tab.url.options';

  $scope.onTabClick = function (tab) {
    currentTab = tab.url;
  };

  $scope.isActive = function(tabUrl) {
    return currentTab === tabUrl;
  };
}]);
