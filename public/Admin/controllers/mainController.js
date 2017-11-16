var app = angular.module("lunchBarAdmin");

app.controller("mainCtrl", function($scope, $http) {

    $scope.screens = ["Orders", "Statistics"];
    $scope.current = $scope.screens[0];

    $scope.statistics = [];

    $scope.item_sets = [];

    $scope.setScreen = function (index) {
        $scope.current = $scope.screens[index];
        if (index == 1) {
            //then we have the screen where we are supposed to show the apriori
            getApriori();
        }
    };

    $scope.getScreen = function () {
        return $scope.current == "Orders" ?  "views/adminOrders.html" : "views/adminStatistics.html";
    };


    function getApriori() {
        $http.get('/api/orders/apriori').then(function (response) {
            $scope.item_sets = [];
            console.log(response.data);
            response.data.apriori.forEach(function(obj) {
                //console.log(obj);
                var string = "";
                obj.itemset.forEach(function(item) {
                    string += item + " ";
                });

                $scope.item_sets.push(string);
            });

            $scope.statistics = response.data;
            drawStatisticCharts();
        },function (error) {
            //$scope.data.orderError = error;
        });
    }

    function drawStatisticCharts() {
        google.charts.load("current", {packages:['corechart']});
        google.charts.setOnLoadCallback(drawChart);
    }

    function drawChart() {

          var chartData = prepareChartData();
          var data = google.visualization.arrayToDataTable(chartData);
          //console.log(chartData);
          var view = new google.visualization.DataView(data);
          view.setColumns([0, 1,
                           { calc: "stringify",
                             sourceColumn: 1,
                             type: "string",
                             role: "annotation" },
                           2]);

          var options = {
            title: "Items Sold Frequency",
            width: 800,
            height: 400,
            legend: { position: "none" },
          };
          var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
          chart.draw(view, options);
    }

    function prepareChartData() {
        var visualData = [];
        visualData.push(["Item", "Frequency Sold", {role : "style"}]);

        $scope.statistics.item_frequency.forEach(function(item) {
            for (var key in item) {
                var tmpArray = [key, parseFloat(item[key]), "#428bca"];
                visualData.push(tmpArray);
            }
        });

        return visualData;
    }
});
