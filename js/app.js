var app = angular.module('ToyBank', ['ui.router', 'ngAnimate', 'ngTouch', 'ui.bootstrap']);

app.controller('appCtrl', ['$profiloService', '$dashService', '$appFactory', function ($profiloService, $dashService, $appFactory) {

    var self = this;

    self.profilo = $appFactory.profilo;
    self.saldo = $appFactory.saldo;
    self.loggato = $appFactory.loggato;

    if (localStorage.getItem('tokenJwt') !== null) {
        $appFactory.loggato = true;
        $profiloService.profilo().then(function (result) {
            self.profilo = result.data;
            $appFactory.profilo.nome = self.profilo.nome;
            $appFactory.profilo.cognome = self.profilo.cognome;
            $appFactory.profilo.ultimoAccesso = self.profilo.ultimoAccesso;
            $appFactory.profilo.codiceFiscale = self.profilo.codiceFiscale;
            $appFactory.profilo.indirizzo = self.profilo.indirizzo;
        });

        $dashService.saldo().then(function (result) {
            self.saldo = result.data;
            $appFactory.saldo.saldoContabile = self.saldo.contabile;
            $appFactory.saldo.saldoDisponibile = self.saldo.disponibile;
            $appFactory.saldo.dataUltimoAccesso = self.saldo.ultimoAccesso;
        });
    }

    self.cleanToken = function () {
        localStorage.removeItem('tokenJwt');
        $appFactory.loggato = false;
    };

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
            return $q.reject(rejection);
        }
    };
});