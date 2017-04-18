angular
    .module('inventoryTurnoverReportModule', ['ui.bootstrap'])
    .controller('conditionQuery', ['$scope', '$rootScope', '$log', '$timeout', function($scope, $rootScope, $log, $timeout) {
        
        $scope.conditionQueryForm = {
            createStartDt: '', //制单日期开始
            createEndDt: '' //制单日期结束
        };
        // 时间控件
        $scope.startDateOptions = {
            formatYear: 'yy',
            maxDate: $scope.conditionQueryForm.createEndDt,
            startingDay: 1,
            showWeeks: false
        };
        $scope.endDateOptions = {
            formatYear: 'yy',
            minDate: $scope.conditionQueryForm.createStartDt,
            // maxDate: new Date(),
            startingDay: 1,
            showWeeks: false
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
    // 城市
    .controller('cityCheckCtrl', ['$scope', function($scope) {
        $scope.citys = [{
            areaId: '009',
            areaName: '江苏省',
            children: [{
                areaId: '025',
                areaName: '南京市',
            }, {
                areaId: '026',
                areaName: '常州市',
            }]
        }, {
            areaId: '009',
            areaName: '安徽省',
            children: [{
                areaId: '0551',
                areaName: '合肥市',
            }]
        }];

        $scope.visible = false;
        $scope.key = 1;
        $scope.provinceIndex = '';
        $scope.cityIndex = '';
        $scope.areaId = '';
        $scope.provinceName = '';
        $scope.cityName = '';
        $scope.checkedAreaName = '';

        $scope.cityCheck = function() {
            $scope.visible = !$scope.visible;
        }
        $scope.clHide = function() {
            $scope.visible = false;
        }
        $scope.handleSelectCity = function(level, index, areaId, areaName) {
            var me = this;
            switch (level) {
                case 'province':
                    $scope.key = 2;
                    $scope.provinceIndex = index;
                    $scope.provinceName = areaName;
                    break;
                case 'city':
                    $scope.cityIndex = index;
                    $scope.areaId = areaId;
                    $scope.cityName = areaName;
                    me.handleSubmitBtn(level);
                    break;
            }
        };
        $scope.handleSubmitBtn = function(level) {
            var me = this;
            switch (level) {
                case 'province':
                    $scope.checkedAreaName = $scope.provinceName;
                    break;
                case 'city':
                    $scope.checkedAreaName = $scope.provinceName + ' ' + $scope.cityName;
                    $scope.visible = false;
                    break;
            }
        }
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