var app = angular.module('ToyBank', ['ui.router', 'ngAnimate', 'ngTouch', 'ui.bootstrap', 'mgo-angular-wizard']);

app.controller('appCtrl', ['$rootScope', '$scope', '$appFactory', '$loginService', '$state', '$uibModal', function ($rootScope, $scope, $appFactory, $loginService, $state, $uibModal) {
    var self = this;
    self.loggato = localStorage.getItem('tokenJwt') !== null ? true : false;

    self.cleanToken = function () {
        localStorage.removeItem('tokenJwt');
        $rootScope.$broadcast('logout');
    };

    $scope.$on('login', function (event, arg) {
        self.loggato = true;
    });

    $scope.$on('logout', function (event, arg) {
        self.loggato = false;
    });

    $scope.$on('loginError', function (event, arg) {
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '../modal/myModalContent.html',
            controller: 'appCtrl',
            resolve: {
                error: function(){
                    return arg.error;
                }
            }
        });
        console.log(modalInstance.resolve);
    });
}]);

app.factory('$appFactory', function () {
    return {
        loggato: false,
        profilo: {
            codiceFiscale: null,
            cognome: null,
            dataUltimoAccesso: null,
            indirizzo: null,
            nome: null
        },
        saldo: {
            saldoContabile: null,
            saldoDisponibile: null,
            dataUltimoAggiornamento: null
        }
    };
});

app.value('baseURL', 'http://localhost:8080');

app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.interceptors.push('loadingInterceptor');

    $urlRouterProvider.otherwise('/login');

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'login/login.html'
    });

    $stateProvider.state('dashboard', {
        url: '/dashboard',
        templateUrl: 'dashboard/dashboard.html'
    });

    $stateProvider.state('profilo', {
        url: '/profilo',
        templateUrl: 'profilo/profilo.html'
    });

    $stateProvider.state('movimenti', {
        url: '/movimenti',
        templateUrl: 'movimenti/movimenti.html'
    });

    $stateProvider.state('bonifico', {
        url: '/bonifico',
        templateUrl: 'bonifico/bonifico.html'
    });

    $stateProvider.state('bonifico.step1', {
        url: '/step1',
        templateUrl: 'bonifico/bonifico.step1.html'
    });

    $stateProvider.state('bonifico.step2', {
        url: '/step2',
        templateUrl: 'bonifico/bonifico.step2.html'
    });

    $stateProvider.state('bonifico.step3', {
        url: '/step3',
        templateUrl: 'bonifico/bonifico.step3.html'
    });
}]);

app.service('loadingInterceptor', function ($q, $log, $rootScope, baseURL) {

    var xhrCreations = 0;
    var xhrResolutions = 0;

    function isLoading() {
        console.log('isLoading', xhrResolutions < xhrCreations);
        return xhrResolutions < xhrCreations;
    }

    function updateStatus() {
        $rootScope.loading = isLoading();
    }

    return {
        request: function (config) {
            if (config.url !== (baseURL + '/security/login')) {
                config.headers['X-JWT-Assertion'] = localStorage.getItem('tokenJwt');
            }

            xhrCreations++;
            updateStatus();
            return config;
        },
        requestError: function (rejection) {
            xhrResolutions++;
            updateStatus();
            $log.error('Request error:', rejection);
            return $q.reject(rejection);
        },
        response: function (response) {
            xhrResolutions++;
            updateStatus();
            return response;
        },
        responseError: function (rejection) {
            xhrResolutions++;
            updateStatus();
            $log.error('Response error:', rejection);
            $rootScope.$broadcast('loginError', rejection.data);
            return $q.reject(rejection);
        }
    };
});