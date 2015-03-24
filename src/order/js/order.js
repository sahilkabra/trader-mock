var orderModule = angular.module('OrderModule', ['LocalStorageModule']);

orderModule.config(['localStorageServiceProvider',
    function(localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('orderModule')
    .setStorageType('sessionStorage')
    .setNotify(true, true);
}]);

//directives
orderModule.directive('newOrder', function() {
  return {
    restrict: 'EA',
    templateUrl: 'src/order/views/new-order.html'
  };
});

orderModule.directive('orderView', function() {
  return {
    restrict: 'EA',
    templateUrl: 'src/order/views/order-view.html'
  };
});

//controllers
orderModule.controller('OrderController',
    ['$scope', 'OrderService',
    function($scope, orderService) {
  $scope.currencyPairs = [{
    code: 'EUR/USD'
  }, {
    code: 'USD/JPY'
  }, {
    code: 'GBP/USD'
  }];

  $scope.order = {
    market: $scope.currencyPairs[0],
    type: 'limit',
    transaction: 'buy',
    units: 1,
    quote: 1.80,
    expires: new Date()
  };

  $scope.orders = orderService.getOrders();

  $scope.isLimitOrder = function(order) {
    return order.type === 'limit';
  };

  $scope.placeOrder = function(order) {
    orderService.placeOrder(order);
  };

  $scope.cancelOrder = function(order) {
    orderService.cancelOrder(order);
  };

  $scope.$on('LocalStorageModule.notification.setItem', function() {
    $scope.orders = orderService.getOrders();
  });

  $scope.$on('LocalStorageModule.notification.removeItem', function() {
    $scope.orders = orderService.getOrders();
  });
}]);

//services
orderModule.factory('OrderService',
   ['$rootScope', 'localStorageService',
   function($rootScope, localStorageService) {
  var service = {
    getOrders: function() {
      return localStorageService.get('orders');
    },

    placeOrder: function(order) {
      var orders = this.getOrders();
      if (!orders) orders = [];
      order.id = orders.length + 1;
      orders.push(order);
      localStorageService.set('orders', orders);
      $rootScope.$broadcast('LocalStorageModule.notification.setItem',
        {key: 'orders', newvalue: order});
    },

    cancelOrder: function(cancelOrder) {
      var orders = this.getOrders();
      var index = 0;
      var order;
      for (index = 0; index < orders.length; index++) {
        order = orders[index];
        if (order.id === cancelOrder.id) {
          localStorageService.set('orders', orders.splice(index,1));
          $rootScope.$broadcast('LocalStorageModule.notification.removeItem',
            {key: 'orders', newvalue: order});
        }
      }
    },
  };
  return service;
}]);


