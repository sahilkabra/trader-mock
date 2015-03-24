var quoteModule = angular.module('QuoteModule', ['OrderModule']);

quoteModule.directive('quoteView', function() {
  return {
    restrict: 'EA',
    templateUrl: 'src/quote/views/quote-view.html'
  };
});

quoteModule.controller('QuoteController',
    ['$scope', 'QuoteService', 'OrderService',
    function($scope, quoteService, orderService) {
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
    quote.newOrderShown = transaction !== $scope.currentQuote.transaction ||
     !quote.newOrderShown;
    if (quote.newOrderShown) {
      quote.transaction = transaction;
      $scope.currentQuote = quote;
      orderService.newQuote(quote);
    } else {
      $scope.currentQuote = {};
      orderService.newQuote();
    }
  };
}]);

quoteModule.factory('QuoteService',
    [function() {
      var service = {};
      return service;
}]);
