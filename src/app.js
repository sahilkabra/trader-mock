var app = angular.module('mockTrader', [
  'ngRoute',
  'tradeController', 'chartController','orderController'
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

app.run(function($rootScope) {
  $rootScope.username = "Demo User";
});
