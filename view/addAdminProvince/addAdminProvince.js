angular
    .module('addStoreManageModule', ['ui.bootstrap'])
    .run(['$rootScope', function($rootScope) {
        $rootScope.checkAdminInfo = {
            'STAFF_ID': null, // 员工ID
            'STAFF_CODE': '', // 集团工号
            'PARTY_ID': null,
            'COMMON_REGION_ID': '', // 地区ID
            'STAFF_NAME': '', // 员工名称
            'SALES_CODE': '', // 员工编码
            'CHANNEL_ID': null, // 所属渠道ID
            'CHANNEL_NBR': null, // 所属渠道编码
            'CHANNEL_NAME': '', // 所属渠道
            'CHANNEL_CLASS': '',
            'OPERATORS_ID': '', // 所属经营主体ID
            'OPERATORS_NBR': '', // 所属经营主体编码
            'OPERATORS_NAME': '', // 所属经营主体
            'REGION_NAME': '', // 地区
            'REGION_CODE': '',
            'UP_REGION_ID': '',
            'AREA_LEVEL': '',
            'ROW_ID': null
        };
        $rootScope.area = {};
    }])
    .factory('httpMethod', ['$http', '$q', function($http, $q) {
        var httpConfig = {
                'siteUrl': 'http://192.168.16.84:8088',
                'requestHeader': {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                'isMock': true // 是否开启测试数据
            },
            httpMethod = {};

        // 管理省份的下拉数据
        httpMethod.qryRegion = function() {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/power/q/qryRegion',
                method: 'POST',
                headers: httpConfig.requestHeader
            }).success(function(data, header, config, status) {
                if (status !== 200) {
                    // 跳转403页面
                }
                defer.resolve(data);
            }).error(function(data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };

        // 条件查询接口
        httpMethod.qryStaffFromCrmLte = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/power/q/qryStaffFromCrmLte',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: 'param=' + JSON.stringify(param)
            }).success(function(data, header, config, status) {
                if (status !== 200) {
                    // 跳转403页面
                }
                defer.resolve(data);
            }).error(function(data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };

        // 新增管理员确认
        httpMethod.insertAdmin = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/chain/power/a/insertAdmin',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: 'param=' + JSON.stringify(param)
            }).success(function(data, header, config, status) {
                if (status !== 200) {
                    // 跳转403页面
                }
                defer.resolve(data);
            }).error(function(data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };

        if (httpConfig.isMock) {
            // 管理省份的下拉数据
            Mock.mock(httpConfig.siteUrl + '/chain/power/q/qryRegion', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data|10': [{
                    'COMMON_REGION_ID': '@id',
                    'REGION_NAME': '@province'
                }],
                'errors': null
            });

            // 条件查询接口
            Mock.mock(httpConfig.siteUrl + '/chain/power/q/qryStaffFromCrmLte', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': {
                    'pageNum': 1,
                    'pageSize': 10,
                    'size': 10,
                    'startRow': 1,
                    'endRow': 10,
                    'total': 33,
                    'pages': 4,
                    'list|4': [{
                        'OPERATORS_ID': null,
                        'OPERATORS_NBR': '',
                        'PARTY_ID': null,
                        'CHANNEL_ID': null,
                        'CHANNEL_NBR': '',
                        'AREA_LEVEL': null,
                        'STAFF_CODE': '',
                        'CHANNEL_NAME': '@cword(4)',
                        'COMMON_REGION_ID': '',
                        'OPERATORS_NAME': '@cword(5)',
                        'REGION_NAME': '@province',
                        'STAFF_ID': '@id',
                        'ROW_ID': null,
                        'STAFF_NAME': '@cname',
                        'CHANNEL_CLASS': '',
                        'REGION_CODE': '',
                        'UP_REGION_ID': null,
                        'SALES_CODE': ''
                    }],
                    'firstPage': 1,
                    'prePage': 0,
                    'nextPage': 2,
                    'lastPage': 4,
                    'isFirstPage': true,
                    'isLastPage': false,
                    'hasPreviousPage': false,
                    'hasNextPage': true,
                    'navigatePages': 8,
                    'navigatepageNums': [1, 2, 3, 4]
                },
                'errors': null
            });

            // 新增管理员确认
            Mock.mock(httpConfig.siteUrl + '/chain/power/a/insertAdmin', {
                'rsphead': 's',
                'success|1': [true, false], //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': null,
                'errors': null
            });
        }

        return httpMethod;
    }])
    .controller('purchaseQueryCtrl', ['$scope', '$rootScope', '$log', '$timeout', 'httpMethod', function($scope, $rootScope, $log, $timeout, httpMethod) {
        // 选择经营主体
        $scope.openStoreQueryType = function() {
            if (!$rootScope.area.COMMON_REGION_ID) {
                swal({
                    title: '操作提醒',
                    text: '请先选择管理省份',
                    timer: 1000,
                    showConfirmButton: false
                });
                return;
            }
            $scope.$emit('openStoreQueryTypeModal', $rootScope.checkAdminInfo);
        };

        $scope.account = '';
        $scope.password = '';
        $scope.repassword = '';
        $scope.phone = '';
        $scope.remarks = '';

        $scope.insertAdmin = function() {
            if (!$rootScope.area.COMMON_REGION_ID) {
                swal({
                    title: '操作提醒',
                    text: '请选择管理省份',
                    timer: 1000,
                    showConfirmButton: false
                });
                return;
            };
            if (!$rootScope.checkAdminInfo.STAFF_ID) {
                swal({
                    title: '操作提醒',
                    text: '请选择员工信息',
                    timer: 1000,
                    showConfirmButton: false
                });
                return;
            };
            if ($scope.password !== $scope.repassword) {
                swal({
                    title: '操作提醒',
                    text: '两次输入密码不一致',
                    timer: 1000,
                    showConfirmButton: false
                });
                return;
            };
            if (!$scope.account.trim()) {
                swal({
                    title: '操作提醒',
                    text: '系统账号不能为空',
                    timer: 1000,
                    showConfirmButton: false
                });
                return;
            };
            if (!$scope.password.trim()) {
                swal({
                    title: '操作提醒',
                    text: '密码不能为空',
                    timer: 1000,
                    showConfirmButton: false
                });
                return;
            };
            if (!$scope.phone.trim()) {
                swal({
                    title: '操作提醒',
                    text: '手机号码不能为空',
                    timer: 1000,
                    showConfirmButton: false
                });
                return;
            };
            if (!/^0{0,1}(13[0-9]|15[7-9]|153|156|17[0-9]|18[7-9])[0-9]{8}$/.test($scope.phone)) {
                swal({
                    title: '操作提醒',
                    text: '手机号码不正确',
                    timer: 1000,
                    showConfirmButton: false
                });
                return;
            }

            var param = {
                'adminType': 'province',
                'staffId': $rootScope.checkAdminInfo.STAFF_ID,
                'account': $scope.account,
                'password': $scope.password,
                'phone': $scope.phone,
                'remarks': $scope.remarks,
                'commonRegionId': $rootScope.area.COMMON_REGION_ID
            };

            httpMethod.insertAdmin(param).then(function(rsp) {
                if (rsp.success) {
                    swal({
                        title: '恭喜你.',
                        text: '新增管理员成功',
                        type: 'success',
                        confirmButtonText: '确定'
                    }, function() {
                        $timeout(function() {
                            // parent.angular.element(parent.$('#tabs')).scope().removeTab();
                        });
                    });
                } else {
                    swal({
                        title: 'Sorry.',
                        text: '新增管理员失败',
                        timer: 1000,
                        showConfirmButton: false
                    });
                }
            });
        };
    }])
    // 弹出框
    .controller('addPurchaseModalCtrl', function($scope, $rootScope, $uibModal) {
        var $ctrl = this,
            modalInstance;
        $ctrl.animationsEnabled = true;
        //对应经营主体
        $scope.$on('openStoreQueryTypeModal', function(d, data) {
            $ctrl.openStoreQueryTypeModal(data);
        });
        $ctrl.openStoreQueryTypeModal = function(data) {
            modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                ariaLabelledBy: 'serial-number-title',
                ariaDescribedBy: 'serial-number-body',
                templateUrl: 'storeQueryTypeModal.html',
                controller: 'storeQueryTypeModalCtrl',
                controllerAs: '$ctrl',
                size: 'lg',
                resolve: {
                    items: function() {
                        return data;
                    }
                }
            });
        };
        $ctrl.toggleAnimation = function() {
            $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
        };
    })
    .controller('storeQueryTypeModalCtrl', function($uibModalInstance, $scope, $rootScope, items, httpMethod) {
        var $ctrl = this;
        $ctrl.staffName = '';
        $ctrl.salesCode = '';
        $ctrl.staffCode = '';
        $ctrl.channnelName = '';
        $ctrl.channelNbr = '';
        $ctrl.operatorsName = '';
        $ctrl.operatorsNbr = '';

        $ctrl.currentPage = 1; //当前页
        $ctrl.rowNumPerPage = 4; //每页显示行数
        $ctrl.totalNum = 0; //总条数
        $ctrl.maxSize = 5; //最大显示页码数

        $ctrl.pageChanged = function() {
            $ctrl.keywordQuery($scope.currentPage);
        };

        //关键字查询
        $ctrl.keywordQuery = function() {
            var param = {
                'curPage': $ctrl.currentPage, //当前页,
                'pageSize': $ctrl.rowNumPerPage, //每页条数,
                'staffName': $ctrl.staffName,
                'salesCode': $ctrl.salesCode,
                'staffCode': $ctrl.staffCode,
                'channnelName': $ctrl.channnelName,
                'channelNbr': $ctrl.channelNbr,
                'operatorsName': $ctrl.operatorsName,
                'operatorsNbr': $ctrl.operatorsNbr,
                'commonRegionId': $rootScope.area.COMMON_REGION_ID
            };

            httpMethod.qryStaffFromCrmLte(param).then(function(rsp) {
                if (rsp.success) {
                    $ctrl.resourceList = rsp.data.list;
                    $ctrl.totalNum = rsp.data.total;
                };
            });
        };

        $ctrl.todoChecked = {}; //待确认的选项
        //单选框选择
        $ctrl.check = function(item) {
            $ctrl.todoChecked = item;
        };

        $ctrl.ok = function() {
            _.assign(items, $ctrl.todoChecked);
            $uibModalInstance.close();
        };
        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
    // 城市
    .controller('cityCheckCtrl', ['$scope', '$rootScope', 'httpMethod', function($scope, $rootScope, httpMethod) {
        httpMethod.qryRegion().then(function(rsp) {
            if (rsp.success) {
                $scope.citys = rsp.data;
            };
        });

        $scope.visible = false;
        $scope.provinceIndex = '';

        $scope.cityCheck = function() {
            $scope.visible = !$scope.visible;
        }
        $scope.clHide = function() {
            $scope.visible = false;
        }
        $scope.handleSelectCity = function(item, index) {
            $scope.provinceIndex = index;
            $rootScope.area = item;
            $rootScope.checkAdminInfo = {
                'STAFF_ID': null, // 员工ID
                'STAFF_CODE': '', // 集团工号
                'PARTY_ID': null,
                'COMMON_REGION_ID': '', // 地区ID
                'STAFF_NAME': '', // 员工名称
                'SALES_CODE': '', // 员工编码
                'CHANNEL_ID': null, // 所属渠道ID
                'CHANNEL_NBR': null, // 所属渠道编码
                'CHANNEL_NAME': '', // 所属渠道
                'CHANNEL_CLASS': '',
                'OPERATORS_ID': '', // 所属经营主体ID
                'OPERATORS_NBR': '', // 所属经营主体编码
                'OPERATORS_NAME': '', // 所属经营主体
                'REGION_NAME': '', // 地区
                'REGION_CODE': '',
                'UP_REGION_ID': '',
                'AREA_LEVEL': '',
                'ROW_ID': null
            };
            $scope.clHide();
        };
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
