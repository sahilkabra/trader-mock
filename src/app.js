var app = angular.module('mockTrader', [
  'ngRoute',
  'TabModule', 'OrderModule', 'TradeModule', 'QuoteModule'
]);

app.run(['$rootScope', 'OrderService',
    function($rootScope, orderService) {
  $rootScope.username = "Demo User";
  var newOrder = {
    market: {code: 'USD/JPY'},
    type: 'market',
    transaction: 'buy',
    units: 1,
    quote: 1.80
  };

 // orderService.placeOrder(newOrder);
}]);

app.controller('TradeController', ['$scope', function($scope) {
}]);
