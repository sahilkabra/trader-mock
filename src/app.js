var app = angular.module('mockTrader', [
  'ngRoute',
  'TabModule', 'OrderModule', 'TradeModule'
]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/newtrade', {
    templateUrl: 'src/trade/views/newtrade.html',
    controller: 'tradeController'
  })
  .when('/chart/:currency-pair', {
    templateUrl: 'src/chart/views/chart.html',
    controller: 'chartController'
  })
  .when('/orders', {
    templateUrl: 'src/order/views/orders.html',
    controller: 'orderController'
  })
  .otherwise({
    redirectTo: '/error.html'
  });
}]);

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

  orderService.placeOrder(newOrder);
}]);

app.controller('TradeController', ['$scope', function($scope) {
}]);
