var app = angular.module('ToyBank', ['ui.router', 'ngAnimate', 'ngTouch', 'ui.bootstrap']);

app.controller('appCtrl', ['$profiloService', '$profiloFactory', '$saldoFactory', '$dashService', '$appFactory', function ($profiloService, $profiloFactory, $saldoFactory, $dashService, $appFactory) {

    var self = this;
    self.appFactory = $appFactory;
    self.profilo = $profiloFactory;

    if (localStorage.getItem('tokenJwt') !== null) {
        $appFactory.loggato = true;
        $profiloService.profilo().then(function (result) {
            self.profilo = result.data;
            $profiloFactory.nome = self.profilo.nome;
            $profiloFactory.cognome = self.profilo.cognome;
            $profiloFactory.dataUltimoAccesso = self.profilo.dataUltimoAccesso;
            $profiloFactory.codiceFiscale = self.profilo.codiceFiscale;
            $profiloFactory.indirizzo = self.profilo.indirizzo;

        });
    }

    self.cleanToken = function () {
        localStorage.removeItem('tokenJwt');
        $appFactory.loggato = false;
    };

}]);

app.factory('$profiloFactory', function () {
    return {
        codiceFiscale: null,
        cognome: null,
        dataUltimoAccesso: null,
        indirizzo: null,
        nome: null
    };
});

app.factory('$appFactory', function () {
    return {
        loggato : false,
    };
});

app.factory('$saldoFactory', function () {
    return {
        saldoContabile: null,
        saldoDisponibile: null,
        dataUltimoAccesso: null
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
            return $q.reject(rejection);
        }
    };
});