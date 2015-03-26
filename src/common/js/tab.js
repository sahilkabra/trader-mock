var app = angular.module('TabModule', []);

app.controller('TabController', ['$scope', function($scope) {
  $scope.tabs = [{
    title: 'Options Trading',
    url: 'tab.url.options',
    active: true
  }, {
    title: 'New Order',
    active: false,
    url: 'tab.url.orders'
  }, {
    title: 'Charts',
    active: false,
    url: 'tab.url.charts'
  }, {
    title: 'Account Summary',
    active: false,
    url: 'tab.url.account.summary'
  }, {
    title: 'Reports',
    active: false,
    url: 'tab.url.reports'
  }];

  $scope.currentTab = $scope.tabs[0];

  $scope.onTabClick = function (tab) {
    $scope.currentTab = tab;
  };

  $scope.isActive = function(tabUrl) {
    return tabUrl === $scope.currentTab.url;
  };
}]);
