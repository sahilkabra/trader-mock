var tradeModule = angular.module('TradeModule', []);

tradeModule.directive('trade', function() {
  return {
    restrict: 'EA',
    templateUrl: 'src/trade/views/trade-view.html'
  };
});

