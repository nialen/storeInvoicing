angular
    .module('sellCashModule', ['ui.bootstrap']) 
    .controller('sellCashQuery', ['$scope',function($scope) {
        // var $ctrl = this;
        $scope.isHidden = true; // 更多查询条件列表是否隐藏
        $scope.isFoldBrand = true; // 品牌列表是否折叠
        $scope.isFoldModel = true; // 型号列表是否折叠

        // 切换展示
        $scope.toggle = function(name) {
            // debugger
            switch (name) {
                case 'isHidden':
                    $scope.isHidden = !$scope.isHidden;
                    break;
                case 'isFoldBrand':
                    $scope.isFoldBrand = !$scope.isFoldBrand;
                    break;
                case 'isFoldModel':
                    $scope.isFoldModel = !$scope.isFoldModel;
                    break;
            }
        }
    }])
     .controller('conditionQuery', ['$scope', '$timeout', function($scope, $timeout) {
        $scope.conditionQueryForm = {
            createStartDt: '', //制单日期开始
            createEndDt: '', //制单日期结束
        };

        // 时间控件
        $scope.startDateOptions = {
            formatYear: 'yy',
            maxDate: $scope.conditionQueryForm.createEndDt,
            startingDay: 1
        };
        $scope.endDateOptions = {
            formatYear: 'yy',
            minDate: $scope.conditionQueryForm.createStartDt,
            // maxDate: new Date(),
            startingDay: 1
        };

        $scope.$watch('conditionQueryForm.createStartDt', function(newValue) {
            $scope.endDateOptions.minDate = newValue;
        });
        $scope.$watch('conditionQueryForm.createEndDt', function(newValue) {
            $scope.startDateOptions.maxDate = newValue;
        });

        $scope.startOpen = function() {
            $timeout(function() {
                $scope.startPopupOpened = true;
            });
        };
        $scope.endOpen = function() {
            $timeout(function() {
                $scope.endPopupOpened = true;
            });
        };
        $scope.startPopupOpened = false;
        $scope.endPopupOpened = false;
    }])
    // 分页控制器
    .controller('paginationCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
        $scope.$on('pageChange', function() {
            $scope.currentPage = 1;
        });

        $scope.maxSize = 10;
        $scope.setPage = function(pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function() {
            $scope.queryTypeFormSubmit($scope.currentPage);
            $log.log('Page changed to: ' + $scope.currentPage);
        };
    }]);
