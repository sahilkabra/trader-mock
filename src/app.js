var app = angular.module('mockTrader', [
  'ngRoute', 'controllers', 'services'
]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/newtrade', {
    templateUrl: 'src/trade/views/newtrade.html',
    controller: 'TradeController'
  })
  .when('/chart/:currency-pair', {
    templateUrl: 'src/chart/views/chart.html',
    controller: 'ChartController'
  })
  .when('/orders', {
    templateUrl: 'src/order/views/orders.html',
    controller: 'OrderController'
  })
  .otherwise({
    redirectTo: '/error.html'
  });
}]);

