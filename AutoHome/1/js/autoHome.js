/**
 * Created by Administrator on 2017/2/24.
 */
  //配置路由模块
var app=angular.module('myApp',['ionic']);
app.config(function ($stateProvider,$urlRouterProvider) {
  $stateProvider
  .state('main',{//主页
      url:'/ahMain',
      templateUrl:'tpl/main.html',
      controller:'mainCtrl'
    })
  .state('new',{//上市新车
      url:'/ahNew',
      templateUrl:'tpl/new.html',
      controller:'newCtrl'
    })
  .state('hot',{//热门车型
      url:'/ahHot',
      templateUrl:'tpl/hot.html',
      controller:'hotCtrl'
    })
  .state('hotSales',{//热销车型
      url:'/ahHotSales',
      templateUrl:'tpl/hotSales.html',
      controller:'hotSaleCtrl'
    })
  .state('userCenter',{//用户中心
      url:'/ahUserCenter',
      templateUrl:'tpl/userCenter.html',
      controller:'userCenterCtrl'
    })
  .state('filter',{//条件选车
      url:'/ahFilter',
      templateUrl:'tpl/filter.html'
    })
  .state('brand',{//品牌车型
      url:'/ahBrand/:id/:bname',
      templateUrl:'tpl/brand.html',
      controller:'brandCtrl'
    })
  .state('search',{//搜索页
      url:'/ahSearch',
      templateUrl:'tpl/search.html',
      controller:'searchCtrl'
    })
  .state('use',{//用途选车
      url:'/ahUse',
      templateUrl:'tpl/use.html',
      controller:'useCtrl'
    })
  .state('detail',{//车辆详情
      url:'/ahDetail/:id/:cname',
      templateUrl:'tpl/detail.html',
      controller:'detailCtrl'
    })
  .state('error',{//错误页面
      url:'/ahError',
      templateUrl:'tpl/error.html',
      controller:'errorCtrl'
    })
  $urlRouterProvider.otherwise('/ahMain');
})
//主控制器
app.controller('parentCtrl',['$scope','$rootScope',
  function ($scope,$rootScope) {
      localStorage['uid']=1;
      $rootScope.notMain=true;
      $scope.notMain=$rootScope.notMain;
    $scope.back= function () {
        if(!$rootScope.notMain){
            history.back();
        }
    }
  }])
//主页
app.controller('mainCtrl',['$scope','$http','$rootScope',
    function ($scope,$http,$rootScope) {
        $rootScope.siteTitle='汽车之家';
        $rootScope.notMain=true;
        $scope.notMain=$rootScope.notMain;
        $scope.brandList=[];
        $http.get('data/main.php')
        .success(function (obj) {
            var data=obj.brandList;
            var t=[];
            angular.forEach(data, function (v) {
                t.push(v.bName_sm.slice(0,1));
            })
            //t去重
            var res = [];
            var json = {};
            for(var i = 0; i < t.length; i++){
                if(!json[t[i]]){
                    res.push(t[i]);
                    json[t[i]] = 1;
                }
            }
            $scope.titles=res;
            $scope.brandList=obj.brandList;
            $scope.firstHotbrands=obj.hotbrands.slice(0,5);
            $scope.secondHotbrands=obj.hotbrands.slice(5,10);
            $scope.count=obj.count[0];
        })
    }])
//品牌页
app.controller('brandCtrl',['$scope','$http','$stateParams','$rootScope',
    function ($scope,$http,$stateParams,$rootScope) {
        $rootScope.notMain=false;
        $rootScope.siteTitle=$stateParams.bname;
        $http.get('data/brand.php?bid='+$stateParams.id)
        .success(function (obj) {
            var t=[];
            angular.forEach(obj.carList, function (v) {
                t.push(v.facName);
            })
            //t去重
            var res = [];
            var json = {};
            for(var i = 0; i < t.length; i++){
                if(!json[t[i]]){
                    res.push(t[i]);
                    json[t[i]] = 1;
                }
            }
            $scope.titles=res;
            $scope.carList=obj.carList;
        })
    }])
//详情页
app.controller('detailCtrl',['$scope','$http','$stateParams','$rootScope',
    function ($scope,$http,$stateParams,$rootScope) {
        $rootScope.notMain=false;
        $scope.onsale=true;
        $scope.saleToggle= function (id) {
            $scope.onsaleIndex=id;
            switch(id){
                case 1:$scope.onsale=true;break;
                case 2:$scope.onsale=false;break;
            }
        }
        //添加到浏览记录表
        $http.get(`data/insert_browse.php?uid=${localStorage['uid']}&carId=${$stateParams.id}&carName=${$stateParams.cname}`)
        .success(function (obj) {
          })
        //查找用户收藏记录表
        $http.get(`data/usercollection.php?uid=${localStorage['uid']}&carId=${$stateParams.id}`)
        .success(function (obj) {
                  if(obj.length!=0){
                      $scope.assertive='assertive';
                      $scope.cid=obj[0].collectionId;
                  }else{
                      $scope.assertive='';
                  }
              //添加或删除收藏记录表
              $scope.addCollection= function () {
                  if($scope.assertive==''){
                      $scope.assertive='assertive';
                      $http.get(`data/addcollection.php?uid=${localStorage['uid']}&carId=${$stateParams.id}&carName=${$stateParams.cname}`)
                        .success(function (obj) {
                            $scope.cid=obj;
                        })
                  }else if($scope.assertive=='assertive'){
                      $scope.assertive='';
                      $http.get(`data/deletecollection.php?cid=${$scope.cid}`)
                        .success(function () {
                        })
                  }
          }
        })
        $rootScope.siteTitle=$stateParams.cname;
        $http.get('data/detail.php?carId='+$stateParams.id)
          .success(function (obj) {
              $scope.car=obj.car;
              $scope.cateName=obj.cateName;
          })
        $http.get('data/impression.php?carId='+$stateParams.id)
        .success(function (obj) {
            if(obj.carModel.length!=0){
                $scope.carModel=obj.carModel;
                $scope.comments=obj.comments;
                $scope.engineOnsale=[];
                $scope.engineOffsale=[];
                angular.forEach(obj.carModel, function (v) {
                    if(v.isOnsale=='true'){
                        $scope.engineOnsale.push(v.engine);
                    }else{
                        $scope.engineOffsale.push(v.engine);
                    }
                })
                var res={},res1={};
                angular.forEach($scope.engineOnsale, function (v) {
                    if(!res[v]){
                        res[v]=v;
                    }
                })
                angular.forEach($scope.engineOffsale, function (v) {
                    if(!res1[v]){
                        res1[v]=v;
                    }
                })
                $scope.engineOnsale=res;
                $scope.engineOffsale=res1;
                $scope.impression=obj.score;
                if(obj.score!=null){
                    $scope.score=obj.score.score;
                    $scope.scoreCount=obj.score.scoreCount;
                    $scope.starsStyle={
                        'width':`${$scope.score*100/5}%`
                    }
                }
            }
        })
    }])
//错误页面
app.controller('errorCtrl',['$rootScope',
    function ($rootScope) {
        $rootScope.siteTitle='汽车之家';
    }])
//热门车型
app.controller('hotCtrl',['$scope','$http','$rootScope',
    function ($scope,$http,$rootScope) {
        $rootScope.notMain=false;
        //按钮组切换样式
        $scope.clickedIndex=1;
        $scope.toggle= function (id) {
            $scope.clickedIndex=id;
        }
        $rootScope.siteTitle='热门车型';
        $http.get('data/hot.php')
        .success(function (obj) {
                $scope.hotList=obj.carList;
            })
        $scope.loadCate = function () {
            if(arguments.length!=0){
                $http
                    .get('data/hot.php?cateId=' + arguments[0])
                    .success(function (data) {
                        $scope.hotList = data.carList;
                    })
            }else{
                $http
                    .get('data/hot.php')
                    .success(function (data) {
                        $scope.hotList = data.carList;
                    })
            }
        }
    }])
//热销车型
app.controller('hotSaleCtrl',['$scope','$http','$rootScope',
    function ($scope,$http,$rootScope) {
        $rootScope.notMain=false;
        //按钮组切换样式
        $scope.clickedIndex=1;
        $scope.toggle= function (id) {
            $scope.clickedIndex=id;
        }
        $rootScope.siteTitle='热销车型';
        $http.get('data/hotsales.php')
            .success(function (obj) {
                $scope.hotList=obj.carList;
            })
        $scope.loadCate = function () {
            if(arguments.length!=0){
                $http
                    .get('data/hotsales.php?cateId=' + arguments[0])
                    .success(function (data) {
                        $scope.hotList = data.carList;
                    })
            }else{
                $http
                    .get('data/hotsales.php')
                    .success(function (data) {
                        $scope.hotList = data.carList;
                    })
            }
        }
    }])
//上市新车
app.controller('newCtrl',['$scope','$http','$rootScope',
    function ($scope,$http,$rootScope) {
        $rootScope.notMain=false;
        $rootScope.siteTitle='上市新车';
        $http.get('data/new.php')
            .success(function (obj) {
                $scope.newList=obj.carList;
            })
    }])
//搜索页
app.controller('searchCtrl',['$scope','$http','$rootScope',
    function ($scope,$http,$rootScope) {
        $rootScope.notMain=false;
        $rootScope.siteTitle='搜索';
        $scope.searchList=false;
        $scope.inputTxt={kw:''};
        $scope.hasdata=false;
        $scope.result=false;
        $scope.$watch('inputTxt.kw', function () {
            if($scope.inputTxt.kw)
            {
                $scope.searchList=true;
                $http
                  .get('data/search_bykw.php?kw=' + $scope.inputTxt.kw)
                  .success(function (data) {
                      $scope.carNameList = data;
                  })
            }
        $scope.searchbyName= function (carName) {
            $scope.searchList=false;
            $scope.result=true;
            $scope.carName=carName;
            $http
              .get('data/search_byname.php?carName=' + carName)
              .success(function (data) {
                    $scope.carCount=parseInt(data.carCount[0]);
                    if($scope.carCount!=0){
                        $scope.hasdata=true;
                    }
                    $scope.carList=data.carList;
                })
            }
        });
    }])
//个人中心
app.controller('userCenterCtrl',['$scope','$http',
    function ($scope,$http) {
        $rootScope.notMain=false;
        //用户浏览记录
    $http.get('data/usercenter.php?uid='+localStorage['uid'])
        .success(function (obj) {
          if(obj.length>10){
              $scope.browserList=obj.slice(obj.length-11)
          }else{
              $scope.browserList=obj;
          }
      })
        //收藏记录
    $http.get('data/usercollection.php?uid='+localStorage['uid'])
        .success(function (data) {
          if(data.length==0){
              $scope.hasCollection=false;
          }else{
              $scope.hasCollection=true;
          }
          $scope.collectionList=data;
      })
}])
//用途选车
app.controller('useCtrl',['$scope','$http',
    function ($scope,$http) {
        $rootScope.notMain=false;
        //按钮组切换样式
        $scope.clickedIndex=1;
        $scope.toggle= function (id) {
            $scope.clickedIndex=id;
        }
    }])