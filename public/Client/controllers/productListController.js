angular.module("lunchbar")    
    .constant("productListActiveClass", "btn-primary")    
    .constant("productListPageCount", 3)    
    .controller("productListCtrl", function ($scope,$http,$location, $filter,productListActiveClass, productListPageCount,cart) {
 
    $scope.showNavbar = true;
    // Get Products
    $scope.title = 'Menu List';
    $http.get('/api/menu').then(function(response) {
    console.log(response);
    $scope.data = response.data;
  });
    
    // Post Products
    
    $scope.sendOrder = function (shippingDetails) {            
        var order = angular.copy(shippingDetails);            
        order.products = cart.getProducts();           
        $http.post('/api/orders', order).then(function (data) {                   
            $scope.data.orderId = data._id;                    
            cart.getProducts().length = 0;               
        }, function (error) {                    
            $scope.data.orderError = error;                
        }).finally(function () {                    
            $location.path("complete");                
        });        
    }
    
//    End Post
    
    var selectedCategory = null;
 
    $scope.selectedPage = 1;        
    $scope.pageSize = productListPageCount;
 
     $scope.selectCategory = function (newCategory) {            
        selectedCategory = newCategory;            
         $scope.selectedPage = 1;        
     }
 
        $scope.selectPage = function (newPage) {            
            $scope.selectedPage = newPage;        
        }
 
        $scope.categoryFilterFn = function (data) {            
            return selectedCategory == null || data.category == selectedCategory;       
        }
 
        $scope.getCategoryClass = function (category) {            
            return selectedCategory == category ? productListActiveClass : "";       
        }
 
        $scope.getPageClass = function (page) {            
            return $scope.selectedPage == page ? productListActiveClass : "";       
        }   

        
         $scope.addProductToCart = function (data) {            
             cart.addProduct(data._id, data.name, data.price);        
         } 

});
 