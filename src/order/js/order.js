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
    code: 'AUD/USD'
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

  $scope.$on('OrderService.newQuote', function() {
    var quote = orderService.quote;
    var market, index;
    if (quote) {
      for (index = 0; index < $scope.currencyPairs.length; index++) {
       if ($scope.currencyPairs[index].code === quote.market) {
         market = $scope.currencyPairs[index];
         break;
       }
      }
      var currentQuote = quote.transaction === 'buy'? quote.buy : quote.sell;
      $scope.order = {
        market: market,
        type: 'market',
        transaction: quote.transaction,
        units: quote.units,
        quote: currentQuote,
        expire: new Date()
      }
    } else {
      $scope.order = {};
    }
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
      order.id = Math.round(Math.random()*10000000);
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
          orders.splice(index,1);
          localStorageService.set('orders', orders);
          $rootScope.$broadcast('LocalStorageModule.notification.removeItem',
            {key: 'orders', newvalue: order});
        }
      }
    },

    newQuote: function(quote) {
      this.quote = quote;
      $rootScope.$broadcast('OrderService.newQuote');
    }
  };
  return service;
}]);


