angular
    .module('inventoryModule', ['ui.bootstrap'])
    .run(['$rootScope', function ($rootScope) {
        $rootScope.regionInfoList = []; // 地区列表
        $rootScope.checkedAreaID = ''; // 选择的地区ID
        $rootScope.qryStockStatisticData = ''; // 终端库存及库存周转分析
        $rootScope.bizmanByConList = []; // 查询的商户列表
        $rootScope.checkedBizmanData = ''; // 待确定的商户
        $rootScope.submitBizmanId = ''; // 确定的商户ID
        $rootScope.submitBizmanName = ''; // 确定的商户名称
    }])
    .factory('httpMethod', ['$http', '$q', function ($http, $q) {
        var httpConfig = {
                'siteUrl': 'http://192.168.16.84:8088',
                'requestHeader': {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                'isMock': true // 是否开启测试数据
            },
            httpMethod = {};

        // 地区查询
        httpMethod.qryCommonRegionInfo = function () {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/terminal/q/qryCommonRegionInfo',
                method: 'POST',
                headers: httpConfig.requestHeader
            }).success(function (data, header, config, status) {
                if (status !== 200) {
                    // 跳转403页面
                }
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };

        // 查询商户
        httpMethod.qryBizmanByCon = function (param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/config/claim/q/qryBizmanByCon',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: $.param(param)
            }).success(function (data, header, config, status) {
                if (status !== 200) {
                    // 跳转403页面
                }
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };

        // 终端库存及库存周转分析
        httpMethod.qryStockAnalysisByCon = function (param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/form/q/qryStockAnalysisByCon',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: $.param(param)
            }).success(function (data, header, config, status) {
                if (status !== 200) {
                    // 跳转403页面
                }
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };

        if (httpConfig.isMock) {
            // 地区查询
            Mock.mock(httpConfig.siteUrl + '/chain/terminal/q/qryCommonRegionInfo', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data|5': [{
                    'commonRegionId|1-100': 100,
                    'regionName': '@province',
                    'regionCode': '',
                    'upRegionId': '',
                    'regionDesc': '',
                    'createDate': '',
                    'idPrefix': '',
                    'areaLevel': '',
                    'zipCode': '',
                    'zoneNumber': '',
                    'areaId': '',
                    'childrenCommon': [{
                        'commonRegionId|1-100': 100,
                        'regionName': '@city',
                        'regionCode': '',
                        'upRegionId': '',
                        'regionDesc': '',
                        'createDate': '',
                        'idPrefix': '',
                        'areaLevel': '',
                        'zipCode': '',
                        'zoneNumber': '',
                        'areaId': '',
                        'childrenCommon': ''
                    }]
                }],
                'errors': null
            });

            // 查询商户
            Mock.mock(httpConfig.siteUrl + '/chain/config/claim/q/qryBizmanByCon', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': {
                    'endRow': 5,
                    'firstPage': 1,
                    'hasNextPage': true,
                    'hasPreviousPage': false,
                    'isFirstPage': true,
                    'isLastPage': false,
                    'lastPage': 2,
                    'list|4': [{
                        'areaId': null,
                        'bizmanCode': null,
                        'bizmanId|10000-20000': 20000, // 商户id
                        'bizmanName': '@cword(4)', // 经营主体名称
                        'commonRegionId': null,
                        'email': null,
                        'identifyName': null,
                        'identifyNum': null,
                        'identifyType': null,
                        'linkNbr': null,
                        'manageStaff': null,
                        'oldBizmanName': null,
                        'operatorsId': null, // 经营主体id
                        'operatorsName': '', // 经营主体名称
                        'operatorsNbr': '', // 经营主体编码
                        'parentBizman': null,
                        'regionName': '@city',
                        'remarks': null,
                        'retailShopName': null,
                        'staffName': null,
                        'statusCd': '1001'
                    }],
                    'navigatePages': 8,
                    'navigatepageNums': null,
                    'nextPage': 2,
                    'pageNum': 1,
                    'pageSize': 5,
                    'pages': 2,
                    'prePage': 0,
                    'size': 5,
                    'startRow': 1,
                    'success': true,
                    'total|10': 10
                },
                'errors': null
            });

            // 终端库存及库存周转分析
            Mock.mock(httpConfig.siteUrl + '/chain/form/q/qryStockAnalysisByCon', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data|7': [{
                    'bizmanId': null,
                    'bizmanName': null,
                    'channelId': null,
                    'channelName': null,
                    'commonRegionId': null,
                    'retailShopId': null,
                    'retailShopName': null,
                    'salesQty|1-100': 100, //(当日销售总和)
                    'stockDuring|1-100': 100, //(最近一周的销量总和)
                    'stockQty|1-100': 100, //(库存总和)
                    'stockTime': '@date', //(统计月份)
                    'stockValue|1-100': 100 //(库存价值总和)
                }],
                'errors': null
            });
        }

        return httpMethod;
    }])
    .controller('conditionQuery', ['$scope', '$rootScope', '$timeout', '$log', 'httpMethod', function ($scope, $rootScope, $timeout, $log, httpMethod) {
        httpMethod.qryCommonRegionInfo().then(function (rsp) {
            $rootScope.regionInfoList = rsp.data;
            $log.log('获取地区列表成功.');
        }, function () {
            $log.log('获取地区列表失败.');
        });


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
            $scope.endDateOptions.maxDate = newValue ? moment(newValue).add(5, 'd') : null;
        });
        $scope.$watch('conditionQueryForm.createEndDt', function(newValue) {
            $scope.startDateOptions.maxDate = newValue;
            $scope.startDateOptions.minDate = newValue ? moment(newValue).subtract(5, 'd') : null;
        });
        $scope.startOpen = function () {
            $timeout(function () {
                $scope.startPopupOpened = true;
            });
        };
        $scope.endOpen = function () {
            $timeout(function () {
                $scope.endPopupOpened = true;
            });
        };
        $scope.startPopupOpened = false;
        $scope.endPopupOpened = false;

        //门店所属商户
        $scope.openStoreQueryType = function () {
            $scope.$emit('openStoreQueryTypeModal');
        };

        // 确定查询
        $scope.queryFormSubmit = function () {
            var param = {
                beginDt: $scope.conditionQueryForm.createStartDt ? moment($scope.conditionQueryForm.createStartDt).format("YYYY-MM-DD") : '', //开始时间
                endDt: $scope.conditionQueryForm.createEndDt ? moment($scope.conditionQueryForm.createEndDt).format("YYYY-MM-DD") : '', //结束时间
                bizmanId: $rootScope.submitBizmanId, //商户id
                commonRegionId: $rootScope.checkedAreaID //区域id
                // curPage: 1,
                // pageSize: 10,
                // totalSize: 0,
            };
            httpMethod.qryStockAnalysisByCon(param).then(function (rsp) {
                $rootScope.qryStockStatisticData = rsp.data;
                $log.log('获取终端库存及库存周转分析数据成功.');
            }, function () {
                $log.log('获取终端库存及库存周转分析数据失败.');
            });
        }
    }])
    // 城市
    .controller('cityCheckCtrl', ['$scope', '$rootScope', '$log', function ($scope, $rootScope, $log) {
        $scope.cityClose = function () {
            $scope.visible = !$scope.visible;
        };
        $scope.clHide = function () {
            $scope.visible = false;
        };

        $scope.selectedRow = null; //一级索引值
        $scope.selectedRowb = null; //二级索引值
        $scope.selectedProvince = '',
            $scope.selectedCity = '',
            $scope.selectedArea = '',
            $scope.checkedAreaName = '',
            $scope.todoCheckedAreaID = ''; //待确定的地区ID

        $scope.selectProvince = function (index, item) {
            $scope.selectedRow = index;
            $scope.selectedRowb = null;
            $scope.selectedProvince = item.regionName;
            $scope.todoCheckedAreaID = item.commonRegionId;
            $scope.selectedCity = '';
            $scope.selectedArea = '';
        };

        $scope.selectCity = function (rowb, item) {
            event.stopPropagation();
            $scope.selectedRowb = rowb;
            $scope.selectedCity = ' - ' + item.regionName;
            $scope.todoCheckedAreaID = item.commonRegionId;
            $scope.selectedArea = '';
        };

        $scope.selectArea = function (rowb, item) {
            event.stopPropagation();
            $scope.selectedArea = ' - ' + item.regionName;
            $scope.todoCheckedAreaID = item.commonRegionId;
        };

        $scope.cityChecked = function () {
            $scope.checkedAreaName = $scope.selectedProvince + $scope.selectedCity + $scope.selectedArea;
            $rootScope.checkedAreaID = $scope.todoCheckedAreaID;
            $scope.visible = !$scope.visible;
        };
    }])
    .controller('inventoryCtrl', ['$rootScope', '$scope', '$timeout', function ($rootScope, $scope, $timeout) {
        $scope.date = [];
        $scope.store = [];
        $scope.sales = [];
        $scope.turndays = [];

        $rootScope.$watch('qryStockStatisticData', function (newValue) {
            if (newValue) {
                var stockDataList = newValue;
                $scope.date = [];
                $scope.store = [];
                $scope.sales = [];
                $scope.turndays = [];

                _.map(stockDataList, function (elem) {
                    $scope.date.push(elem.stockTime);
                    $scope.store.push(elem.stockQty);
                    $scope.sales.push(elem.salesQty || 0);
                    $scope.turndays.push((elem.salesQty * 7 / (elem.stockDuring || 1)).toFixed(4)); // 计算公式: salesQty * 7 / (stockDuring || 1)
                });
            }
        }, true);
    }])
    .directive('brandChart', function () {
        return {
            scope: {
                id: "@",
                date: "=", // X轴
                store: "=", // 库存到达量
                sales: "=", // 当日销售
                turndays: "=" // 库存周转天数
            },
            restrict: 'E',
            template: '<div style="height:300px; width:100%;"></div>',
            replace: true,
            link: function ($scope, iElm, iAttrs, controller) {
                var option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['库存到达量', '库存价值（元）', '库存周转天数']
                    },
                    color: ['#41c9eb', '#fd5c5c', '#41be47'],
                    xAxis: [
                        {
                            type: 'category',
                            data: $scope.date
                        }
                    ],
                    yAxis: [
                        {
                            show: false,
                        },
                        {
                            show: false,
                        }
                    ],
                    series: [
                        {
                            name: '库存到达量',
                            type: 'bar',
                            barGap: 0,
                            data: $scope.store
                        },
                        {
                            name: '库存价值（元）',
                            type: 'bar',
                            barGap: 0,
                            data: $scope.sales
                        },
                        {
                            name: '库存周转天数',
                            type: 'line',
                            label: {
                                normal: {
                                    show: true
                                }
                            },
                            yAxisIndex: 1,
                            symbol: 'circle',
                            data: $scope.turndays
                        }
                    ]
                };
                var myChart = echarts.init(document.getElementById($scope.id), 'macarons');
                myChart.setOption(option);

                $scope.$watch('store', function (newValue) {
                    if (newValue) {
                        myChart.setOption({
                            legend: {
                                data: ['库存到达量', '库存价值（元）', '库存周转天数']
                            },
                            xAxis: [
                                {
                                    data: $scope.date
                                }
                            ],
                            series: [
                                {
                                    name: '库存到达量',
                                    data: $scope.store
                                },
                                {
                                    name: '库存价值（元）',
                                    data: $scope.sales
                                },
                                {
                                    name: '库存周转天数',
                                    data: $scope.turndays
                                }
                            ]
                        });
                    }
                }, true);
            }
        };
    })
    // 弹出框
    .controller('addPurchaseModalCtrl', function ($scope, $rootScope, $uibModal) {
        var $ctrl = this,
            modalInstance;
        $ctrl.animationsEnabled = true;

        //门店所属商户
        $scope.$on('openStoreQueryTypeModal', function (d, data) {
            $rootScope.bizmanByConList = []; // 置空商户列表
            $ctrl.openStoreQueryTypeModal(data);
        });

        $ctrl.openStoreQueryTypeModal = function (data) {
            modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                ariaLabelledBy: 'serial-number-title1',
                ariaDescribedBy: 'serial-number-body',
                templateUrl: 'storeQueryTypeModal.html',
                controller: 'storeQueryTypeModalCtrl',
                controllerAs: '$ctrl',
                size: 'lg',
                resolve: {
                    items: function () {
                        return data;
                    }
                }
            });
        };

        $ctrl.toggleAnimation = function () {
            $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
        };
    })
    .controller('storeQueryTypeModalCtrl', function ($uibModalInstance, $scope, items) {
        var $ctrl = this;
        $ctrl.ok = function () {
            $scope.$broadcast('submitCardRange');
            $uibModalInstance.close();
        };
        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    // 弹出框查询商户
    .controller('queryStoreCtrl', ['$scope', '$rootScope', '$log', '$http', 'httpMethod', function ($scope, $rootScope, $log, $http, httpMethod) {
        $scope.requirePaging = true; // 是否需要分页
        $scope.currentPage = 1; // 当前页
        $scope.rowNumPerPage = 4; // 每页显示行数
        $scope.totalNum = 0; // 总条数

        $scope.queryStoreFormSubmit = function (currentPage) {
            !currentPage && $scope.$broadcast('pageChange');
            var param = {
                areaId: $scope.areaId, // 地区id也就是commonRegionId
                bizmanId: $scope.bizmanId, // 商户Id
                bizmanName: $scope.bizmanName, // 商户名称
                // storeName: $scope.storeName, // 门店名称
                // cityId: '', // 城市id
                curPage: currentPage || $scope.currentPage,
                pageSize: $scope.rowNumPerPage,
                totalSize: $scope.totalNum
            };
            httpMethod.qryBizmanByCon(param).then(function (rsp) {
                $rootScope.bizmanByConList = rsp.data.list;
                $scope.totalNum = rsp.data.total;
                $log.log('获取商戶列表成功.');
            }, function () {
                $log.log('获取商戶列表失败.');
            });
        };

        // 城市选择
        $scope.visible = false;
        $scope.key = 1;
        $scope.provinceIndex = '';
        $scope.cityIndex = '';
        $scope.areaId = '';
        $scope.provinceName = '';
        $scope.cityName = '';
        $scope.checkedAreaName = '';
        $scope.cityCheck = function () {
            $scope.visible = !$scope.visible;
        };
        $scope.handleSelectCity = function (level, index, areaId, areaName) {
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
        $scope.handleSubmitBtn = function (level) {
            switch (level) {
                case 'province':
                    $scope.checkedAreaName = $scope.provinceName;
                    break;
                case 'city':
                    $scope.checkedAreaName = $scope.provinceName + ' ' + $scope.cityName;
                    $scope.visible = false;
                    break;
            }
        };
    }])
    // 弹出查询结果
    .controller('resultStoreCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.selectSysList = function (item) {
            $rootScope.checkedBizmanData = item;
        };

        $scope.$on('submitCardRange', function () {
            $rootScope.submitBizmanId = $rootScope.checkedBizmanData.bizmanId;
            $rootScope.submitBizmanName = $rootScope.checkedBizmanData.bizmanName;
        });
    }])
    // 分页控制器
    .controller('paginationCtrl', ['$scope', '$rootScope', '$log', function ($scope, $rootScope, $log) {
        $scope.$on('pageChange', function () {
            $scope.currentPage = 1;
        });

        $scope.maxSize = 4;
        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };
        $scope.pageChanged = function () {
            $scope.queryStoreFormSubmit($scope.currentPage);
        };
    }])
