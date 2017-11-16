var app = angular.module("lunchBarAdmin");

app.controller("ordersCtrl", function ($scope, $http) {

    $http.get('/api/orders').then(function (data) {
        console.log(data);
        $scope.orders = data.data;
    },function (error) {
        $scope.data.orderError = error;
    });

    $scope.selectedOrder;

    $scope.selectOrder = function(orderID) {
        for (var i = 0; i < $scope.orders.length; i ++) {
            if ($scope.orders[i]._id == orderID) {
                console.log('order found');
                $scope.selectedOrder = $scope.orders[i];
            }
        }
    };


    $scope.calcTotal = function(orderID) {
        var total = 0;
        for (var i = 0; i < $scope.orders.length; i ++) {
            if ($scope.orders[i]._id == orderID) {
                var products = $scope.orders[i].products;
                for (var j = 0; j < products.length; j++) {
                    total += products[j].price;
                }
            }
        }

        return total;
    }

});
