'use strict';
var quoteModule = angular.module('QuoteModule', ['OrderModule']);

quoteModule.directive('quoteView', function() {
  return {
    restrict: 'EA',
    templateUrl: 'src/quote/views/quote-view.html'
  };
});

quoteModule.controller('QuoteController',
    ['$scope', '$modal',
      'QuoteService', 'OrderService',
    function($scope, $modal, quoteService, orderService) {
  $scope.quotes = [{
    market: 'EUR/USD',
    low: '1.2294',
    high: '1.2370',
    sell: '1.2340',
    buy: '1.2343',
    newOrderShow: false,
    units: 1
  },{
    market: 'AUD/USD',
    low: '0.7778',
    high: '1.7980',
    sell: '1.7878',
    buy: '1.7880',
    newOrderShow: false,
    units: 1
  }];

  $scope.currentQuote = {};
  $scope.toggleNewOrder = function(quote, transaction) {
    quote.transaction = transaction;
    $scope.currentQuote = quote;
    orderService.newQuote(quote);
    (function() {
      $scope.open();
    })();
  };

  $scope.open = function() {
    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: ''
    });
  };
}]);


quoteModule.controller('ModalInstanceCtrl',
   ['$scope', '$modalInstance',
    function ($scope, $modalInstance) {
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);

quoteModule.factory('QuoteService',
    [function() {
      var service = {};
      return service;
}]);
