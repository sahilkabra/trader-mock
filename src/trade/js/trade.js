'use strict';
var tradeModule = angular.module('TradeModule', ['OrderModule', 'QuoteModule']);

tradeModule.directive('trade', function() {
  return {
    restrict: 'EA',
    templateUrl: 'src/trade/views/trade-view.html'
  };
});

